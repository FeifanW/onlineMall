<template>  
<!-- index.vue就是首页 -->
<!-- 这个index.vue就是为了方便首页和底部的组件可以复用 -->
  <div class="index">
    <!-- 要包含在安全区域内 -->
    <div class="container"> 
      <!-- 导航菜单和轮播图 -->
      <div class="swiper-box">
        <!-- 导航菜单 -->
        <div class="nav-menu">
          <!-- 父级 -->
          <ul class="menu-wrap">
            <!-- 每一个子项，children右面展开的产品列表，里面会有很多子项，所以要用a标签 -->
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <!-- 鼠标移动到上面显示，移开的时候不显示 -->
              <div class="children">  
                <!-- 二维数组 -->
                <ul v-for="(item,index) in menuList" :key='index'> 
                  <li v-for="(sub,index) in item" :key="index">
                    <a :href="sub ? '/#/product' + sub.id:''">
                      <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="">
                      {{sub ? sub.name : '小米9' }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <!-- 控制一下自动轮播 -->
        <swiper :options="swiperOption">
          <!-- 每个slide就是一个商品，而且要实现跳转功能-->
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <!-- 用指令之后，里面就是JS表达式 -->
            <a :href="'/#/product/'+item.id"><img :src="item.img"></a> 
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div><!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
          <div class="swiper-button-prev" slot="button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
          <div class="swiper-button-next" slot="button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        </swiper>
      </div>
      <!-- 广告位 -->
      <div class="ads-box">
        <!-- key是用来缓存组件用的 -->
        <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList" v-bind:key="index">
          <!-- 把v-bind换成v-lazy,src也不需要了-->
          <img v-lazy="item.img" alt="">  
        </a>
      </div>
      <!-- 广告条 -->
      <div class="banner">
        <a href="'/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
          <!-- 产品列表 -->
    <div class="product-box">
      <!-- 不会超出安全区域 -->
      <div class="container">
      <h2>手机</h2>
      <!-- 因为是左右结构，所以先定义一个wrapper把它包裹起来 -->
      <div class="wrapper">
        <div class="banner-left">
          <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
        </div>
        <div class="list-box">
          <!-- 循环内容列表，两行四列，所以写两个list,或者直接用接口 -->
          <!-- 循环出来才调样式 -->
          <div class="list" v-for="(arr,index) in phoneList" :key="index">
            <!-- 具体每一块包含的内容 -->
            <div class="item" v-for="(item,index) in arr" :key="index">
               <!-- 接口里面没有新品这一说，所以自己先本地写个方法模拟一下吧 -->
              <span :class="{'new-pro':index%2==0}">新品</span>
              <div class="item-img">
                <img v-lazy="item.mainImage" alt="">
              </div>
              <div class="item-info">
                <h3>{{item.name}}</h3>
                <p>{{item.subtitle}}</p>
                <!-- 点击价格的时候弹出来购物车对话框，所以要在这绑定事件,需要和后端对数据 -->
                <p class="price" @click="addCart(item.id)">{{item.price}}元</p>  
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
   <service-bar></service-bar>
   <modal 
    title="提示" 
    sureText="查看购物车" 
    btnType="1" 
    modalType="middle" 
    :showModal="showModal"
    @submit="goToCart"
    @cancel="showModal=false"  
    >
    <!-- 点击取消就关闭窗口 -->

     <!-- 现在和以前添加slot的方法不一样了，需要添加一个template模板 -->
     <template v-slot:body>  
       <p>商品添加成功！</p>
     </template>
   </modal>
  </div>
</template>
<script>
  import ServiceBar from '../components/ServiceBar'  //不加在home.vue是因为，有的页面时不需要这个组件的,在需要的页面单独加
  import Modal from '../components/Modal'  //不加在home.vue是因为，有的页面时不需要这个组件的,在需要的页面单独加
  import { Swiper, SwiperSlide} from 'vue-awesome-swiper'  //不需要引入全部组件，只需要解构的引用部分组件
  import 'swiper/css/swiper.css'  //必须要引入样式
  export default{
    name:'index',
    components: {
      Swiper,
      SwiperSlide,
      ServiceBar,
      Modal
    },
    data(){
      return {
        swiperOption:{
          autoplay:true, //打开自动播放
          loop:true,  //轮播循环
          pagination: {
          el: '.swiper-pagination',  //绑定分页器
          },
          navigation: {  //绑定前进后退按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        },
        slideList:[ //循环的列表，轮播需要图片，跳转需要id,因为没有后端数据，所以自己写数据
          {
            id:'42',
            img:'/imgs/slider/slide-1.jpg'
          },
          {
            id:'45',
            img:'/imgs/slider/slide-2.jpg'
          },
          {
            id:'46',
            img:'/imgs/slider/slide-3.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-4.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-5.jpg'
          }
        ],
        menuList:[  //用二维数组，保存列表展开内容
          [
            {
              id:'30',
              img:'/imgs/item-box-1.png',
              name:'小米CC9'
            },{
              id:'31',
              img:'/imgs/item-box-2.png',
              name:'小米8青春版'
            },{
              id:'32',
              img:'/imgs/item-box-3.jpg',
              name:'Redmi K20 Pro'
            },{
              id:'33',
              img:'/imgs/item-box-4.jpg',
              name:'移动4G+专区'
            },
          ],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
        ],
        adsList:[
          {
            id:33,
            img:'/imgs/ads/ads-1.png'
          },{
            id:48,
            img:'/imgs/ads/ads-2.jpg'
          },{
            id:45,
            img:'/imgs/ads/ads-3.png'
          },{
            id:47,
            img:'/imgs/ads/ads-4.jpg'
          },
        ],
        phoneList:[],  //从后台返回数据
        showModal:false  //默认是不弹出窗口，在上面设置点击事件，显示框框
      }
    },
    mounted(){  //把phoneList里的内容，通过后端返回回来
      this.init();
    },
    methods:{
      init(){  //生命周期vue页面最开始创建的时候
        this.axios.get('/products',{  //get请求要用params的形式
          params:{
            categoryId:100012,
            pageSize:14, //从后台取8条数据
          }
        }).then((res) => {  //res是返回的结果，把返回的8条数据切割成二维数组
          res.list = res.list.slice(6,14);  //前6条给顶部导航栏展开
          this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)]  //slice不会改变原数组，splice会改变原数组
        })
      },
      addCart(id){

        // 后台接口文档里面，添加购物车是POST方法,地址是/carts
        this.axios.post('/carts',{  //第一个参数是地址，第二个参数是要传递的参数
          productId: id,
          selected: true  //在加入购物车的那一刻，这个商品就已经是选中状态了
          //所以但凡功能是后端控制，前端认为就会轻松很多
        }).then((res)=>{  //链式调用
          this.showModal = true;
          this.$store.dispatch('saveCartCount',res.cartTotalQuantity);  //派发出去
        }).catch(()=>{
          this.showModal = true;
        })
      },
      goToCart(){
        this.$router.push('/cart')  //点击购物车之后实现路由跳转
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';  //引入主题色
  //插件里的样式也是可以覆盖的
  //图片太大了，要调整一下插件里的样式
  .index{
    .swiper-box{
      .nav-menu{
        position: absolute;
        z-index: 9;
        width: 264px;
        height: 451px;
        padding: 26px 0;
        background-color: #55585AA1;
        box-sizing: border-box;
        .menu-wrap{
          .menu-item{
            height: 50px;  //可以居中了
            line-height: 50px;
            a{
              font-size: 16px;
              display: block;  //不加block，因为块内还有空间，所以箭头就挤在一起了
              position: relative;
              color: #ffffff;
              padding-left: 30px;
              &:after{ //伪类
                position: absolute;  //只加这个就跑出去了，所以要给a父元素添加相对定位
                right: 30px;
                top: 17.5px; //根据高度差计算的，居中
                content:' ';
                @include bgImg(10px,15px,'/imgs/icon-arrow.png')
              }
            }
            &:hover{
              background-color: $colorA;
              .children{
                display: block; //实现移动到上面就显示内容，移开的时候不显示
              }
            }
            .children{  //children是在menu-item下面
              display: none;
              width: 962px;
              height: 451px;
              background-color: $colorG;
              position: absolute;
              top: 0;
              left: 264px;
              border: 1px solid $colorH;
              ul{
                display: flex;  //利用flex布局，给展开菜单排列
                justify-content: space-between; //两端对齐
                height: 75px;
                li{
                  height: 75px; //垂直方向居中
                  line-height: 75px;
                  width: 241px;
                  padding-left: 23px;
                }
                a{ //文字是白色所以没有显示出来
                  color:$colorB;
                  font-size: 14px;
                }
                img{
                  width: 42px;
                  height: 35px;
                  vertical-align: middle; //图片和文字居中
                  margin-right:15px;
                }
              }
            }
          }
        }
      }
      .swiper-container{ //调整 一下图片大样式
        height: 451px;
        .swiper-button-prev{
          left: 274px;  //设置轮播左箭头的样式，防止被菜单盖住
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .ads-box{
      @include flex();
      margin-top: 14px;
      margin-bottom: 31px;
      a{
        width: 296px;
        height: 167px;
      }
    }
    .banner{
      margin-bottom: 50px;
    }
    .product-box{
      background-color: $colorJ;
      padding: 30px 0 50px;
      h2{
        font-size: $fontF;
        height: 21px;
        line-height: 21px;
        color: $colorB;
        margin-bottom: 20px;
      }
      .wrapper{
        display: flex;  //子元素变成行内块元素，自动撑开
        .banner-left{
          margin-right: 16px;
          img{
            width: 224px;
            height: 619px;
          }
        }
        .list-box{
          .list{
            @include flex();
            width: 986px;
            margin-bottom: 14px;
            &:last-child{
              margin-bottom: 0;
            }
            .item{
              width: 236px;
              height: 302px;
              background-color: $colorG;
              text-align: center;
              span{
                display: inline-block;  //只是行内元素的话，背景颜色设置不上去
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: $colorG;
                &.new-pro{  //新品
                  background-color: #7ECF68;
                }
                &.kill-pro{  //秒杀
                  background-color: #E82626;
                }

              }
              .item-img{
                img{
                  width: 100%;  //防止图片超出去
                  height: 195px;
                }
              }
              .item-info{
                h3{
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                }
                p{
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }
                .price{
                  color: #F20A0A;
                  font-size: $fontJ;
                  font-weight: bold;
                  cursor:pointer;  //移动上去之后变成小手
                  &::after{
                    content: '';
                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                    margin-left: 5px;
                    vertical-align: middle;  //居中
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>