<template>
  <!-- 服务条组件，因为在多个页面都有，所以单独封装出来 -->
  <div class="service">
    <div class="container">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满150元包邮</li>
      </ul>
    </div>
  </div>
</template>
<script>

export default{
  name:'service-bar',   //name可以帮助实现，组件自己调用自己
}
</script>
<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .service{
    padding:33px 0;
    color: #666666;
    font-size: 16px;
    li{
      display: inline-block;
      width: 24.9%;  //25%的话有可能被浏览器挤下来，浏览器有差异
      text-align: center;
      border-right: 1px solid #E5E5E5;
      span{
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle; //文字和图标居中
        margin-right: 8px;
      }
      .icon-setting{
        @include bgImg(20px,20px,'/imgs/icon-setting.png');
      }
      .icon-7day{
        @include bgImg(20px,20px,'/imgs/icon-7day.png');
      }
      .icon-15day{
        @include bgImg(20px,20px,'/imgs/icon-15day.png');
      }
      .icon-post{
        @include bgImg(20px,20px,'/imgs/icon-post.png');
      }
    }
  }
</style>
