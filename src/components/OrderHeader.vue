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
import {mapState} from 'vuex';
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
    .header-logo{
      float: left;  //不能在公共组件里加，需要单独加
    }
    .title,.username{
      display: inline-block;  //因为一行里面有好几个
      height: 55px;
      line-height: 55px; //垂直居中
    }
    .title{
      font-size: 28px;
      float:left;
      color:#333333;
      margin-left: 54px;
      span{
        font-size: 14px;
        margin-left: 17px;
        color: #999999;
        font-weight: bold;
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