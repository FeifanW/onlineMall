<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{payment}}</span>元</p>
              <!-- icon-down就是向下展开功能 -->
              <!-- 动态绑定一个class,可以实现图标转换  -->
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <!-- v-if元素隐藏时，会在dom节点中把该元素移出，v-show元素隐藏的时候会在dom节点中把CSS属性设置为display:none，元素依然在dom节点中 -->
          <!-- v-if="showDetail" -->
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <!-- 懒加载，服务器端的图片已经帮我们做CDN缓存了 -->
                    <img v-lazy="item.productImage"/>{{item.productName}}  
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payType==1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'checked':payType==2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 微信弹窗 -->
    <!-- 这个close是子组件自定义事件 -->
    <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
    <!-- 判断是否确认支付 ，3的话可以确认也可以取消，showPayModal可以控制什么时候弹窗
    关闭弹窗的时候，就把当前弹窗页面关闭掉了
    -->
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal=false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import QRcode from 'qrcode'
import ScanPayCode from './../components/ScanPayCode'
import OrderHeader from './../components/OrderHeader'
import Modal from './../components/Modal'
export default{
  name:'order-pay',
  data() {
    return{
      orderId:this.$route.query.orderNo, //这个一进来就可以获取到
      addressInfo:'',  //收货人地址信息
      orderDetail:[],  // 订单详情，包含商品列表
      showDetail:false,  //是否显示订单详情
      payType:'',  //支付类型
      showPay:false,  //是否显示微信支付弹框
      payImg:'', //微信支付的二维码
      showPayModal:false,  //是否显示二次支付确认弹框
      payment:'',   //总金额
      T:''  //保存定时器ID状态
    }
  },
  components:{
    ScanPayCode,
    Modal,
    OrderHeader,
  },
  mounted(){
    this.getOrderDetail();  //调用一下这个接口
  },
  methods: {  //方法都放在methods里面
    getOrderDetail(){  //通过动态路由的方式传参
      this.axios.get(`/orders/${this.orderId}`).then((res)=>{
      let item = res.shippingVo;  //这个shippingVo就是在门户-订单接口的3 订单详情
      //用模板字面量的话可以加空格
      this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
      // 添加功能，点击订单详情的时候把数据拉下来进行展示
      this.orderDetail = res.orderItemVoList;  //其实返回的是一个列表
      this.payment = res.payment; //从接口获取总金额
      })
    },
    paySubmit(payType){
      if(payType == 1){  //说明是支付宝支付，我们要跳转到中间页面 ,windos.open可以打开新窗口，a标签也可以打开
        this.payType=1
        window.open('/#/order/alipay?orderId='+this.orderId,'_blank')  //第一个参数是url地址，就是中间件的页面alipay.vue,在新窗口打开
      }else{//得到的form会渲染到页面上去
        this.payType=2
        this.axios.post('/pay',{  //用微信和支付宝传的参数差不多
          orderId:this.orderId,
          orderName:'商城官网练习',
          amount:0.01,  //单位元
          payType:2,
        }).then((res)=>{  //res就是data里面的数组，在main.js里面已经拦截过了
          QRcode.toDataURL(res.content)
          .then(url=>{
            this.showPay = true;
            this.payImg = url;  //把图片保存起来，进行渲染
            this.loopOrderState();  //二维码出来之后，就开始轮询
          })
          .catch(() => {
            this.$message.error('微信二维码生成失败，请稍后重试')
          })
        })  
      }  
    },
    //关闭微信弹框
    closePayModal(){
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.T);
    },
    //轮询当前订单支付状态
    loopOrderState(){
      //查看接口文档可以获取订单状态 20-是已付款
      this.T = setInterval(()=>{
        this.axios.get(`/orders/${this.orderId}`).then((res)=>{
          if(res.status == 20){  //说明用户已经付款
            clearInterval(this.T);  //如果不清掉会一直轮询下去
            this.goOrderList();  //帮助用户进行跳转
          }
        })
      },1000)
    },
    goOrderList(){
      this.$router.push('/order/list');  //router和route要区分清楚，router是全局路由器对象，route是当前跳转的路由对象
    }
  },
}


</script>
<style lang="scss">
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
            .icon-up{
              transform: rotate(180deg);
            }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>