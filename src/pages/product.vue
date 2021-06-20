<template>
  <div class="product">
      <product-param :title="product.name">
        <template v-slot:buy>  
          <!-- 子组件里的插槽 -->
          <button class="btn" @click="buy">立即购买</button>
        </template>
      </product-param>
      <div class="content">
        <div class="item-bg">
          <h2>{{product.name}}</h2>
          <h3>{{product.subtitle}}</h3>
          <p>
            <a href="" id="">全球首款双频 GP</a>
            <span>|</span>
            <a href="" id="">骁龙845</a>
            <span>|</span>
            <a href="" id="">AI 变焦双摄</a>
            <span>|</span>
            <a href="" id="">红外人脸识别</a>
          </p>
          <div class="price">
            <span>￥<em>{{product.price}}</em></span>
          </div>
        </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <!-- 用item-swiper包裹一下 -->
      <div class="item-swiper">  
        <!-- 用swiper包裹，然后 动态绑定options -->
        <!-- 在swiperOptions里面添加配置信息 -->
        <swiper :options="swiperOption">   
          <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现的淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg" @click="showSlide='slideDown'"></div>
        <div class="video-box" >
          <!-- 这个遮罩就根据这个showSlide来变化 -->
          <div class="overlay" v-if="showSlide=='slideDown'"></div>
          <!-- 当showSlide为true的时候就有这个class,没有的时候就不是这个class -->
          <div class="video" v-bind:class="showSlide">
            <span class="icon-close" @click="showSlide='slideUp'"></span>
            <!-- 添加controls之后，视频就可以播放了，但是视频需要做成一个模态框的样子 muted是静音-->
            <video src="/imgs/product/video.mp4" autoplay muted controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductParam from './../components/ProductParam';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';  //结构赋值，因为只需要用到这个插件的一部分
export default{
  name:'product',
  components:{
    ProductParam,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      showSlide:'', //控制视频动画效果 
      product:{}, //商品信息
      swiperOption:{
        autoplay:true,
        slidesPerView:3,
        spaceBetween:22,
        freeMode:true,
        pagination:{
          el:'.swiper-pagination',
          clickable:true,
        }
      }
    }
  },
  mounted() {  //渲染完成的时候加载
    this.getProductInfo();
  },
  methods:{
    getProductInfo() {  //axios获取数据
      let id = this.$route.params.id;  //获取当前页面路由的id
      this.axios.get(`/products/${id}`).then((res) => {  //从后端获取数据
        this.product = res;
      })
    },
    buy() {
      let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);
    }
  }
}
</script>
<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .product{
    .content{
      .item-bg{
        background: url('/imgs/product/product-bg-1.png') no-repeat center;
        height: 718px;
        text-align: center;
        h2{
          font-size: 80px;
          padding-top: 55px;
        }
        h3{
          font-size: 24px;
          letter-spacing: 10px;
        }
        p{
          margin-top: 21px;
          margin-bottom: 40px;
          a{
            font-size: 16px;
            color: #333333;
          }
          span{
            margin: 0 15px;
          }
        }
        .price{
          font-size: 30px;
          color: #333333;
          em{
            font-style: normal;
            font-size: 38px;
          }
        }
      }
      .item-bg-2{
        background: url(/imgs/product/product-bg-2.png) no-repeat center;
        height: 480px;
        background-size: 1226px 397px;
      }
      .item-bg-3{
        background:url(/imgs/product/product-bg-3.png) no-repeat center;
        height:638px;
        background-size:cover;
      }
      .item-swiper{
        --swiper-pagination-color: white; //分页器颜色
        margin: 36px auto 52px;
        .desc{
          font-size: 18px;
          color: #333333;
          text-align: center;
        }
        img{
          width: 100%;
        }
      }
      .item-video{
        height: 1044px;
        background-color: #070708;
        margin-bottom: 76px;
        color: #FFFFFF;
        text-align: center;
        h2{
          font-size: 60px;
          padding-top: 82px;
          margin-bottom: 47px;
        }
        p{
          font-size: 24px;
          margin-bottom: 58px;
        }
        .video-bg{
          background: url('/imgs/product/gallery-1.png') no-repeat center;
          background-size: cover;
          width: 1226px;
          height: 540px;
          margin: 0 auto 120px;
          cursor: pointer;
        }
        .video-box{  //弹窗模态功能
          // 遮罩
          .overlay{
            @include position(fixed);
            background-color: #333333;
            opacity: .4;
          }
          //定义一个动画animation,多看官方文档，效果一直是成对的,单页应用不建议用transition
          @keyframes slideDown{  //用from to方法，动画特别复杂可以用百分数
            from{
              top: -50%;
              opacity: 0;
            }
            to{
              top: 50%;
              opacity: 1;
            }
          }
          @keyframes slideUp{  //animation动画
            from{
              top: 50%;
              opacity: 1;
            }
            to{
              top: -50%;
              opacity: 0;
            }
          }
          .video{
            position: fixed;
            top:-50%;
            left: 50%;  //需要移动到中间
            transform: translate(-50%,-50%);
            z-index: 10;
            width: 1000px;
            height: 536px;
            opacity: 1;
            &.slideDown{
              animation: slideDown .6s linear;
              top: 50%;
            }
            &.slideUp{
              animation: slideUp .6s linear;
            }
            .icon-close{  //关闭按钮
              position: absolute;
              top: 20px;
              right: 20px;
              @include bgImg(20px,20px,'/imgs/icon-close.png');
              cursor: pointer;
              z-index: 11;
            }
            video{
              width: 100%;  //撑满容器
              height: 100%;
              object-fit: cover;  //覆盖掉原生的阴影
              outline: none; //outline也是内置样式，
            }
          }

        }
      }
    }
    button{
      margin-left: 10px;
    }   
  }
</style>
