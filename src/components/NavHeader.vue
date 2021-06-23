<template>
  <div class='header'>
    <div class="nav-topbar">
      <div class="container"> 
        <!-- 分左右两块 -->
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <!-- 已经登录的显示名字，没有登录显示登录 -->
          <a href="javascript:;" v-if="username">{{username}}</a> 
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username">我的订单</a>
                              <!-- 在下面定义goToCart -->
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <!-- 分三部分：logo、菜单和搜索 -->
      <div class="container">
        <!-- 动画效果用CSS3的transition就行 -->
        <div class="header-logo">  
          <!-- 路径回到首页 -->
          <a href="/#/index"></a>  
        </div>
        <div class="header-menu">
          <!-- 有好几个部分，而且每个部分下面有展开的内容 -->
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <!-- 循环用li标签最合适，用一个绝对定位 -->
              <ul>
                <!-- 包括三块，图标名称和标题 -->
                <!-- 只留一个模板，然后循环,用key的话，渲染速度更快，复用率更高 -->
                <li class="product" v-for="(item,index) in phoneList" :key="index">  
                  <!-- 点击之后跳转新窗口，href要绑定产品跳转的页面 -->
                  <!-- 一旦用了指令之后，引号里就是js变量，用字符串的话一定要加单引号 -->
                  <a v-bind:href="'/#/product/'+item.id" target="_blank"> 
                    <div class="pro-img">
                      <!-- 图片也要动态渲染,alt属性是在图片无法显示的时候会显示的文字 -->
                      <img v-lazy="item.mainImage" :alt="item.subtitle">  
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <!-- 因为数据库里没有加单位，所以这里要利用过滤器添加"元"字，在export default里面定义filters-->
                    <div class="pro-price">{{item.price | currency}}</div>  
                  </a>
                </li>
              </ul>


            </div>
          </div>
          <div class="item-menu">
            <span>Redmi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
                            <ul>
                <!-- 包括三块，图标名称和标题 -->
                <li class="product">
                  <!-- 点击之后跳转新窗口 -->
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- 点击之后跳转新窗口 -->
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- 点击之后跳转新窗口 -->
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- 点击之后跳转新窗口 -->
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- 点击之后跳转新窗口 -->
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- 点击之后跳转新窗口 -->
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="header-search">
          <!-- wrapper是包装的意思，是内置的样式辅助我们定位-->
          <div class="wrapper">  
            <!-- name规定了input的名字 -->
            <input type="text" name="keyword">
            <!-- 用a标签实现放大镜图片 -->
            <a href="javascript:;"></a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

export default{
  name:'nav-header',
  data() {
    return {  //不用return的话，会在全局生效，造成变量污染
              //username从Vuex里获取登录数据
      phoneList:[]
    }
  },
  computed:{  //一开始这个username变量没有，随后一旦获取到了，就会重新帮我们计算一次
    username() {  //首页刷新之后还存在
      return this.$store.state.username;
    },
    cartCount() {
      return this.$store.state.cartCount;   //购物车数量也显示出来
    }
  },
  filters:{  //过滤器，用于对金额添加元字。一般涉及到金额的都要用过滤器。
    currency(val){
      if(!val) return '0.00';
      return '￥' + val.toFixed(2) + '元'; //toFixed方法可把 Number 四舍五入为指定小数位数的数字
    }
  },
  mounted() {
    this.getProductList();
  },
  methods:{
    login(){
      this.$router.push('/login')  //登录的路由跳转，修改了url
    },
    getProductList(){
      this.axios.get('/products',{  //get用的是params的方式,如果是post则直接写
        params:{
          categoryId:'100012',
          pageSize:6  //一次只返回6个元素
        }
      }).then((res) => {  //返回的是接口main.js里定义拦截的response.data里的内容
        if(res.list.length >= 6){
          this.phoneList = res.list  //当列表里数据大于6时截取6条数据
        }
      })
    },
    goToCart(){
      this.$router.push('/cart')  //用这种方式去跳转路由,修改了url
    }
  }
}
</script>
// 定义预处理器语法
// webpack安装老版本的，node sass和sass loader可以用cnpm安装
//  --dev是安装在devDependencies里面，--save是安装在Dependencies里面
<style lang="scss">
  // 因为container重复出现了，所以抽离出来放到base.scss里面
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height:39px;
      line-height:39px;
      background-color: #333333;
      color: #B0B0B0;
      .container{
        width:1226px;
        margin-right:auto;
        margin-left:auto;
        // 使用flex布局,设置两边对齐，中间居中
        @include flex();
        a{
          display: inline-block;
          color:#B0B0B0; //上面设置了字体但是没有用，因为a标签自带样式
          margin-right: 17px;
        }
        .my-cart{
          width: 110px;
          background-color: #FF6600;
          text-align: center; //居中
          color: #ffffff;
          margin-right: 0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right:4px;
          }
        }
      }
    }
    .nav-header{
      // 引入的container会在它的作用域下有效，这里我们重新写，可以覆盖掉上面的
      .container{
        position: relative;  //让手机和logo对齐
        height:112px;  //顶部菜单栏高度，宽度在base.scss里面定义好了
        @include flex();
        .header-menu{
          display: inline-block;
          width: 643px;  //这样元素就能顶头了
          padding-left: 209px;  //左边距
          .item-menu{  //菜单选项
            display: inline-block;
            color: #333333;
            font-weight: bold;
            font-size:16px;
            line-height: 112px; //否则不会全居中
            margin-right: 20px;
            span{
              cursor: pointer;  //cursor光标属性，移动到上面的时候会变成小手
            }
            &:hover{ //移动到上面变色
              color:$colorA;
              // 移动到上面的时候，需要向下展开内容
              .children{
                height: 220px;
                opacity: 1; //移动到上面的时候不透明，显示出来
              }
            }
            .children{
              // 默认隐藏起来，高度设为0
              position: absolute; //脱离文档流，但是样式还是不对，我们希望图片和logo对齐
              top: 112px;
              left: 0;
              width: 1226px;
              border-top: 1px solid #E5E5E5;
              box-shadow:  0px 7px 6px 0px rgba(0, 0, 0, 0.11);  //添加阴影
              z-index: 10;
              height: 0; //默认不显示，移动到上面的时候改透明度
              opacity: 0;
              transition: height .5s;
              overflow: hidden;
              background-color: #ffffff;
              .product{
                position: relative;  //给父元素相对定位，子元素绝对定位，才可以让竖线每个产品都显示
                // 让手机页面横线均分排布，用比例16.6%
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;  //统一字体大小
                line-height: 12px;
                text-align: center;
                a{  //让a显示更自然一些
                  display: inline-block;
                }
                //图片太大了
                img{
                  width: auto;
                  height: 111px;
                  margin-top:26px
                }
                .pro-img{ //图片的容器小一点
                  height: 137px;
                }
                .pro-name{
                  font-weight: bold;
                  margin-top: 19px; //离上部19px
                  margin-bottom: 8px;
                  color: $colorB; //通用性强的用config
                }
                .pro-price{
                  color: $colorA;
                }
                 // 产品之间的虚线，用伪类解决
                &::before{   //放在li标签里
                  content: ''; //没有显示是因为没有占位
                  position: absolute;
                  top: 28px;
                  right: 0;
                  border-left: 1px solid $colorF;
                  height: 100px;
                  width: 1px;
                }
                &:last-child::before{ //把最后一个竖条去掉
                  display: none;
                }
            }
          }
        }
        }
        .header-search{
          width: 319px;
          .wrapper{  //外层包裹的class，包裹性作用类似div
            height: 50px;
            border: 1px solid #E0E0E0;
            display: flex; //图标居中，这样里面的placeholder和放大镜图标都会垂直居中
            align-items: center;
            input{
              border: none;
              border-right: 1px solid #E0E0E0; //文字框左上有阴影就因为浏览器的内置样式
              width: 264px;
              height: 50px;
              padding-left: 14px; //输入的时候不要上文字贴着左边的边
              box-sizing: border-box;  //原来的时候是364+14+1所以宽度较高，这样宽就固定是364，不会包括padding值了
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left: 17px;
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>