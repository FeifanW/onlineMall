<template>
  <div class="order-confirm">
    <!-- svg比图片小很多，可以作为一种优化方式，在这里定义了-->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z" class="path1"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path>
          <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path>
          <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path>
          <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path>
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <!-- 从收货地址接口获取 -->
              <!-- 当index = checkIndex的时候，添加样式，添加一个橘色的边框 -->
              <!-- 这里比较难理解 -->
              <div class="addr-info" :class="{'checked':index == checkIndex}" @click="checkIndex=index" v-for="(item,index) in list" :key="index">
                <!-- 收货人的姓名、手机号、地址-->
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div class="street">{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
                <!-- 两个svg图标，删除和编辑功能 ，图标在顶部的svg里面有定义，根据对应的id可以取到-->
                <div class="action">
                  <!-- 删除的时候需要把它的id传进去 -->
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <svg class="icon icon-del">
                      <!-- use的作用是从文档内部取出一个节点，克隆它。-->
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                  <!-- rf就是编辑按钮 -->
                  <a href="javascript:;" class="fr" @click="editAddressModal(item)">
                    <svg class="icon icon-edit">
                      <use xlink:href="#icon-edit"></use>
                    </svg>
                  </a>
                </div>
              </div>
              <!-- 点击添加地址的时候，需要把窗口显示出来 ，所以添加一个点击事件-->
              <div class="addr-add" @click="openAddressModal">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <!-- 从后端接口返回的购物车商品数据 -->
              <li v-for="(item,index) in cartList" :key="index">
                <div class="good-name">
                  <!-- 后端可能已经把图片上传到CDN里面了，所以可能会用CDN的地址，后台会自动加 -->
                  <!-- 使用图片懒加载 -->
                  <img v-lazy="item.productMainImage" alt="">
                  <!-- 产品名称和副标题 -->
                  <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                <!-- 金额是后端计算好的，考虑到安全性 -->
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
             <!-- 这里没有加优惠的功能，实际上优惠也是从后端减的 -->
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>

    <modal
      title="新增确认"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal=false"
      @submit="submitAddress"
    >
    <!-- 提交的时候会绑定一个submitAddress来提交 -->
      <!-- 添加收货地址弹窗 -->
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <!-- 通过接口文档，这只v-model里面的内容 -->
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <!-- 下拉框 -->
            <!-- 省区市 ，真实情况是一般从百度地图数据库拉取，先获取省再获取市-->
            <!-- v-model="checkedItem.receiverProvince" -->
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity" >
              <option value="北京" selected="selected">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict" >
              <option value="北京" selected="selected">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
              <option value="天津">西城区</option>
              <option value="河北">顺义区</option>
              <option value="天津">房山区</option>
            </select>
          </div>
          <div class="item">   
            <!-- 具体放到那个小区那个街道 -->
            <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
          </div>
        </div>
      </template>
    </modal>
    <!-- 1是确认按钮 -->
    <!-- @cancel和@submit都是自定义事件，在子组件中触发 -->
    <!-- @cancel点击取消就会关闭弹窗 -->
    <!-- 点击删除之后弹窗 -->
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"

      @cancel="showDelModal=false"
      @submit="submitAddress"
    >
      <!-- 添加插槽，插槽内容在子组件Modal里面 -->
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from './../components/Modal'  //弹窗组件，在首页添加购物车的时候用到过
export default{
  name:'order-confirm',
  data(){
    return {
      list:[],//收货地址列表
      cartList:[],//购物车中需要结算的商品列表, 两条线中间的部分，接口可以直接返回
      cartTotalPrice:0,//商品总金额
      count:0,//商品结算数量
      checkedItem:{},//选中的商品对象,既要做删除又要做编辑的功能
      userAction:'',//用户行为 0：新增 1：编辑 2：删除
      showDelModal:false,//是否显示删除弹框
      showEditModal:false,//是否显示新增或者编辑弹框，默认改成flase就不显示
      checkIndex:0//当前收货地址选中索引
    }
  },
  components:{
    Modal
  },
  mounted(){
    this.getAddressList();  //接口获取收货地址
    this.getCartList();   // 获取购物车的商品数据
  },
  methods:{
    getAddressList(){  //根据后端接口
      this.axios.get('/shippings').then((res)=>{
        this.list = res.list;  //直接用res.list因为，在axios接口拦截的地方，status为0时直接返回的res.data
      })
    },
    // 打开新增地址弹框
    openAddressModal(){
      this.userAction = 0;  //0是新增
      this.checkedItem = {}; //选中的商品对象
      this.showEditModal = true;  //设为true之后，弹窗才会弹出来
    },
    // 打开新增地址弹框
    editAddressModal(item){
      this.userAction = 1;  // 编辑功能
      this.checkedItem = item;  //点击编辑按钮之后，需要把信息都填进去
      this.showEditModal = true;
    },
    delAddress(item){  //在上面的子组件Modal里面点击按钮之后会触发这个方法
      this.checkedItem = item;  //选中的商品
      this.userAction = 2;  //2代表是删除功能
      this.showDelModal = true;  //把弹框显示出来
    },
    // 地址删除、编辑、新增功能
    submitAddress(){
      let {checkedItem,userAction} = this;  //使用解构语法，获取选择的商品，和要进行的操作
      let method,url,params={};  //给一个默认的对象
      // 删除、新增、更新需要发送不同的请求
      if(userAction == 0){  //0代表新增
        method = 'post',url = '/shippings';
      }else if(userAction == 1){  //1代表修改功能
        method = 'put',url = `/shippings/${checkedItem.id}`; //使用模板字面量，根据的接口文档
      }else {  //删除功能
        method = 'delete',url = `/shippings/${checkedItem.id}`;
      }
      // 有校验
      if(userAction == 0 || userAction ==1){  //0代表新增， 1代表修改功能
        //因为都是从checkedItem里面获取的，所以可以用解构赋值，得到对应的信息
        let { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = checkedItem;
        let errMsg='';  //定义错误提示信息
        if(!receiverName){ //如果收货人的名称没有填，就提醒一下
          errMsg = '请输入收货人名称';
        }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){  //没有输入手机或者正则不满足
          errMsg = '请输入正确格式的手机号';
        }else if(!receiverProvince){
          errMsg = '请选择省份';
        }else if(!receiverCity){
          errMsg = '请选择对应的城市';
        }else if(!receiverAddress || !receiverDistrict){ //地址或者区县都是空
          errMsg = '请输入收货地址';
        }else if(!/\d{6}/.test(receiverZip)){  //不满足邮编正则，false的话说明验证失败
          errMsg = '请输入六位邮编';
        }
        if(errMsg){  //那个出问题，提示那个
          this.$message.error(errMsg); //使用element ui 辅助弹框
          return;
        }
        params = {  //获取到参数，作用到下面的axios里面的和服务器交互
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        }
      }
      // 调用接口进行提交
      this.axios[method](url,params).then(()=>{  //动态的获取方法进行调用，第一个是url地址，第二个是参数统一传递params里的参数
        this.closeModal();  //成功之后调用这个关闭窗口，恢复状态
        this.getAddressList();  //重新拉取一次，获取结算窗口里面目前有几个商品，更新商品信息
        this.$message.success('操作成功');  //操作成功，element-ui
      });
    },
    closeModal(){  //因为要设置的项比较多，所以单独抽出来closeModal进行 一个还原
      this.checkedItem = {};
      this.userAction = '';
      this.showDelModal = false;
      this.showEditModal = false;
    },
    getCartList(){
      this.axios.get('/carts').then((res)=>{
        let list = res.cartProductVoList;//获取购物车中所有商品数据
        this.cartTotalPrice = res.cartTotalPrice;//商品总金额，后台计算出来
        this.cartList = list.filter(item=>item.productSelected); //过来选中的商品
        // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
        // map() 方法按照原始数组元素顺序依次处理元素。
        this.cartList.map((item)=>{   //需要结算的商品cartList
          this.count += item.quantity;
        })
      })
    },
    // 订单提交，点击提交按钮会调用这个方法
    orderSubmit(){
      let item = this.list[this.checkIndex];  //从订单列表里面找索引的这个值
      if(!item){   //如果找不到，提示不存在
        this.$message.error('请选择一个收货地址');  //element ui提示
        return;  //防止往下走
      }
      //掉一下提交订单的接口
      this.axios.post('/orders',{ //shippingId就是这次的订单号
        shippingId:item.id  //收货地址的id
      }).then((res)=>{
        this.$router.push({  //获取数据成功之后就要跳转到订单结算里面，通过this.$router.push进行跳转
         //路由跳转的几种方式，一种是字符串直接跳转，另一种就是push方法
          path:'/order/pay',
          query:{   //query和params是两种传参方式
            orderNo:res.orderNo  //orderNo最终会传到订单结算页面，把订单号拼接上去
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
  .order-confirm{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:84px;
      .order-box{
        background-color:#ffffff;
        padding-left: 40px;
        padding-bottom: 40px;
        .addr-title{
          font-size: 20px;
          color: #333333;
          font-weight: 200;
          margin-bottom:21px;
        }
        .item-address{
          padding-top: 38px;
          .addr-list{
            .addr-info,.addr-add{
              box-sizing:border-box;
              float: left;
              width:271px;
              height:180px;
              border:1px solid #E5E5E5;
              margin-right: 15px;
              padding: 15px 24px;
              font-size: 14px;
              color:#757575;
            }
            .addr-info{
              cursor:pointer;
              h2{
                height:27px;
                font-size:18px;
                font-weight: 300;
                color:#333;
                margin-bottom:10px;
              }
              .street{
                height:50px;
              }
              .action{
                height:50px;
                line-height:50px;
                .icon{
                  width: 20px;
                  height: 20px;
                  fill: #666666;
                  vertical-align: middle;
                  &:hover{
                    fill: #FF6700;
                  }
                }
              }
              &.checked{
                border:1px solid #ff6700;
              }
            }
            .addr-add{
              text-align:center;
              color: #999999;
              cursor:pointer;
              .icon-add{
                width:30px;
                height:30px;
                border-radius:50%;
                background:url('/imgs/icon-add.png') #E0E0E0 no-repeat center;
                background-size:14px;
                margin: 0 auto;
                margin-top: 45px;
                margin-bottom: 10px;
              }
            }
          }
        }
        .item-good{
          margin-top:34px;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 12px;
          h2{
            border-bottom:1px solid #E5E5E5;
            padding-bottom: 5px;
          }
          li{
            display:flex;
            align-items: center;
            height:40px;
            line-height:40px;
            margin-top:10px;
            font-size:16px;
            color:#333333;
            .good-name{
              flex:5;
              img{
                width:30px;
                height:30px;
                vertical-align:middle;
              }
            }
            .good-price{
              flex:2;
            }
            .good-total{
              padding-right:44px;
              color:#FF6600;
            }
          }
        }
        .item-shipping,.item-invoice{
          margin-top:31px;
          line-height: 20px;
          h2{
            display: inline-block;
            margin-right: 71px;
            font-size: 20px;
            width: 80px;
          }
          span,a{
            font-size:16px;
            color:#FF6700;
            margin-right:23px;
          }
        }
        .detail{
          padding: 50px 44px 33px 0;
          border-bottom: 1px solid #f5f5f5;
          text-align: right;
          font-size: 16px;
          color: #666666;
          .item-val{
            color:#FF6700;
          }
          .item{
            line-height: 15px;
            margin-bottom: 12px;
          }
          .item-val{
            display:inline-block;
            width:100px;
          }
          .item-total{
            .item-val{
              font-size:28px;
            }
          }
        }
        .btn-group{
          margin-top: 37px;
          text-align: right;
        }
      }
    }
    .edit-wrap{
      font-size:14px;
      .item{
        margin-bottom:15px;
        .input{  //最上面两个输入框
          box-sizing: border-box;  //不设置盒模型就会导致换行
          display:inline-block;
          width:283px;
          height:40px;
          line-height:40px;
          padding-left:15px;
          border:1px solid #E5E5E5;
          &+.input{  //相邻兄弟选择器，&连体服
            margin-left:14px;
          }
        }
        select{  //选择地址
          height:40px;
          line-height:40px;
          border:1px solid #E5E5E5;
          margin-right:15px;
        }
        textarea{
          height:62px;  
          width:100%;
          padding:13px 15px;
          box-sizing:border-box;
          border:1px solid #E5E5E5;
        }
      }
    }
  }
</style>