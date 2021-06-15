<template>  
<!-- template下面必须由一个根元素div -->
  <div class="footer">
    <!-- 一个logo，下面一些链接 -->
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">MIUI</a><span>|</span>
      <a href="javascript:;">小米商城隐私政策</a><span>|</span>
      <a href="javascript:;">小米商城用户协议</a><span>|</span>
      <a href="javascript:;">问题反馈</a>
    </div>
    <div class="copyright">© mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2020]0276-042号</div>
  </div>
</template>
<script>

export default{
  name:'nav-footer',
}
</script>
<style lang="scss" scoped>
  .footer{
    height:234px;
    border-top: 4px solid #FF6600;
    background-color: #333333;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color: #999999; //需要重新声明一下是因为a链接的默认样式优先级大于父级，所以需要单独设置一下
        display: inline-block;
      }
      span{
        margin: 0 10px;
      }
      margin-bottom: 13px;
    }
  }
</style>