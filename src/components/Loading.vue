<template>
  <!-- img里面有svg的素材 -->
  <div class="loading">  
    <img src="/imgs/loading-svg/loading-bars.svg" alt="">
  </div>
</template>
<script>
export default {
  name:"loading"  //任何组件都起一个名字，哪怕不用它
}
</script>
<style lang="scss">
  .loading{
    height: 80px;
    line-height: 80px;
    text-align: center;
    padding: 30px 0;
    img{
      height: 100%;
    }
  }
</style>