<template>
  <!-- 导航桥 -->
  <div class="nav-bar" :class="{'is_fixed':isFixed}">  
    <!-- 保证在安全范围内 -->
    <div class="container">  
      <!-- 一个是标题 -->
      <div class="pro-title">
        小米8
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <!-- 用插槽可以随意定制功能 -->
        <slot name="buy"></slot>  
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'nav-bar', //导出一个名称
  data() {
    return {
      isFixed:false,  //判断是否需要定位，高度高于152的时候，变成需要定位
    }
  },
  mounted() {
    window.addEventListener('scroll',this.initHeight)
  },
  methods:{
    initHeight() {
      // 要考虑到兼容性
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    }
  },
  destroyed() {
    window.removeEventListener('scroll',this.initHeight,false)  //销毁的时候，一定要移除这个方法，不然在其他页面也会被调用
  }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .nav-bar{
    height: 70px;
    line-height: 70px;
    border-top: 1px solid $colorH;
    background-color: $colorG;  //加一个背景颜色，原来是透明的
    box-shadow: 0 5px 5px $colorE;  //加一个阴影
    &.is_fixed{  //滚动然后吸附到顶部
      position: fixed;  //在父容器上加绝对定位之后，父容器的宽度就和内容区宽度一样了
      top: 0;
      width: 100%;  //所以要加一个宽度
    }
    .container{ //使用了mixin
      @include flex();
      .pro-title{
        font-size:$fontH;
        color:$colorB;
        font-weight: bold;  
      }
      .pro-param{
        font-size: $fontJ;
        span{
          margin: 0 10px;
        }
        a{
          color: $colorC;
        }
      }
    }
  }
</style>