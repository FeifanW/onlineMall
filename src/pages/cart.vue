<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <!-- span就是那个全选按钮，用列表模拟横向栏 -->
            <!-- 控制是否全选 ，绑定toggleAll事件-->
            <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
            <!-- id上不同的数字代表不同的flex:grow值，因为用的是flex布局 -->
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <!-- 把加购物车的列表显示出来 -->
            <li class="cart-item" v-for="(item,index) in list" v-bind:key="index">
              <div class="item-check">
                <!-- 购物车每一项是否被选中，可以使用动态绑定，也就是后台返回的productSelected是true的时候就是选中了，添加这个class -->
                <span class="checkbox" v-bind:class="{'checked':item.productSelected}"  @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <!-- 图片懒加载，v-lazy -->
                <img v-lazy="item.productMainImage" alt="">
                <!-- 显示商品的名称和标题 -->
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <!-- 价格一般不放在前端，有可能会有安全性问题 -->
              <div class="item-price">{{item.productPrice}}</div> 
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <!-- 选中的商品的数量 -->
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;"  @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <!-- 总价格，是后端计算，不是在前端计算的，保证安全性 -->
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            <!-- 一共有多少件商品 -->
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            <!-- 总金额后台计算好了 -->
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import OrderHeader from './../components/OrderHeader'  //顶部导航栏
  import ServiceBar from './../components/ServiceBar'  //底部服务栏
  import NavFooter from './../components/NavFooter'   //页脚
  export default{
    name:'index',
    components:{  //引用的组件要注册一下
      OrderHeader,
      ServiceBar,
      NavFooter
    },
    data(){
      return {
        list:[],//商品列表
        allChecked:false,//是否全选
        cartTotalPrice:0,//商品总金额
        checkedNum:0//选中商品数量
      }
    },
    mounted(){
      this.getCartList();  //页面加载的时候获取数据
    },
    methods:{
      // 获取购物车列表
      getCartList(){     //根据接口文档
      //接口是get方法，添加是post方法,更新是put方法，删除是delete方法
        this.axios.get('/carts').then((res)=>{
          this.renderData(res);
        })
      },
      // 更新购物车数量和购物车单选状态
      updateCart(item,type){
        let quantity = item.quantity,
            selected = item.productSelected;
        if(type == '-'){
          if(quantity == 1){
            this.$message.warning('商品至少保留一件');
            return;
          }
          --quantity;
        }else if(type == '+'){
          if(quantity > item.productStock){
            this.$message.warning('购买数量不能超过库存数量');
            return;
          }
          ++quantity;
        }else{
          selected = !item.productSelected;
        }
        this.axios.put(`/carts/${item.productId}`,{
          quantity,
          selected
        }).then((res)=>{
          this.renderData(res);
        })
      },
      //所以的数据都是从后台拉取，而不是在本地计算
      // 删除购物车商品
      delProduct(item){
        this.axios.delete(`/carts/${item.productId}`).then((res)=>{
          this.$message.success('删除成功');
          this.renderData(res);
        });
      },
      // 控制全选功能
      toggleAll(){
        // this.allChecked可以用来判断当前是否全选，点击之后取反
        let url = this.allChecked?'/carts/unSelectAll':'/carts/selectAll';
        // 接口文档里面是put方法
        this.axios.put(url).then((res)=>{
          this.renderData(res);
        })
      },
      // 公共赋值，控制全选和非全选也用到里面的内容
      renderData(res){
        this.list = res.cartProductVoList || [];  //获取产品列表
        this.allChecked = res.selectedAll;
        this.cartTotalPrice = res.cartTotalPrice;
        this.checkedNum = this.list.filter(item=>item.productSelected).length;  //一选择的件数需要通过过滤的方式找到，打钩的件数
      },
      // 购物车下单
      order(){
        let isCheck = this.list.every(item=>!item.productSelected);
        if(isCheck){
          this.$message.warning('请选择一件商品');
        }else{
          this.$router.push('/order/confirm');
        }
      }
    }
  }
</script>
<style lang="scss">
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;  //文字居中
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;  //图片是一个透明的对号，所以要添加背景颜色
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;  //表头的文字居中
          line-height: 79px;
          .col-1{   //按照flex:grow的比例分配距离
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{   //就是下面是否选中的状态
          .cart-item{
            display:flex;
            align-items:center;  //文字垂直居中
            height:125px;
            border-top:1px solid #E5E5E5;   //上面一条分界线
            font-size:16px;
            .item-check{  //前面的按钮
              flex:1;
            }
            .item-name{  //图片和名称
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;  
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{   //按钮里面的 + 和 - 都可以用a链接
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{   //中间的数字用span
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{  //小计，某一种产品总价格
              flex:1;
              color:#FF6600;
            }
            .item-del{  //可以实现删除操作，删除按钮，用成背景图片
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;  //no-repeat是为了防止平铺
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{   //下面的总计一栏
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;  //居中
        line-height: 50px;
        .cart-tip{  //左边一栏
          margin-left: 29px;
          a{   //继续购物
            color: #666666;
            margin-right:37px;
          }
          span{  //选中数字
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{  //右侧一栏
          font-size:14px;
          color:#FF6600;
          span{  //总金额
            font-size:24px;
          }
          a{   //右侧去结算按钮
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>
