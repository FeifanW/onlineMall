<template>
  <div>
    <order-header v-bind:title="title">
    <!-- 在不同页面显示不同的内容 -->
    <template v-slot:tip>
        <span>{{tip}}</span> 
    </template>
    </order-header>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from '../components/OrderHeader'
import NavFooter from '../components/NavFooter'
import ServiceBar from '../components/ServiceBar.vue'
export default {
  name:'order',
  data(){
    return {
      title:'',
      tip:''
    }
  },
  components:{
    OrderHeader,
    ServiceBar,
    NavFooter
  },
  mounted(){
    let path = this.$route.path;
    if(path == '/order/confirm'){
      this.title = '订单确认';
      this.tip = '请认真填写收货地址'
    }else if(path == '/order/list'){
      this.title = '订单列表'
      this.tip = '请谨防钓鱼链接或诈骗电话，了解更多'
    }else if(path == '/order/pay'){  //包括微信支付和阿里支付
      this.title = '订单支付';
      this.tip = '请谨防钓鱼链接或者诈骗电话，了解更多'
    }
  }
}
</script>