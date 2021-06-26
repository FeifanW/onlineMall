<template>
  <!-- 一个页面有一个总的class，防止页面间串用 -->
  <div class="order-header">
    <!-- 用安全区域包裹一下 -->
    <!-- 使用浮动会导致塌陷，所以在父元素用一个clearfix -->
    <div class="container clearfix">  
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2>{{title}}<slot name="tip"></slot></h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';  //username是在加载之后，再运行一次计算属性得到的
export default{
  name:'order-header',
  props:{  //复用组件
    title:String
  },
  computed:{  //获取vuex里的username
    ...mapState(['username','cartCount'])
  },
}
</script>
<style lang="scss">
  .order-header{
    padding: 30px 0;
    border-bottom: 2px solid #FF6600;
    .header-logo{
      float: left;  //不能在公共组件里加，需要单独加
    }
    .title,.username{
      display: inline-block;  //因为一行里面有好几个
      height: 55px;
      line-height: 55px; //垂直居中
    }
    .title{
      float:left;
      margin-left: 54px;
      h2{   //因为优先级的原因，所以在h2里面设置字体和颜色
        font-size: 28px;
        color:#333333;
      }
      span{
        font-size: 14px;
        margin-left: 17px;
        color: #999999;
        font-weight: 200;
      }
    }
    .username{
      float: right;
      a{
        color: #666666;
        font-size: 16px;
      }
    }
  }
</style>