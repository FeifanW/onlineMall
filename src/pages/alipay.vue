<template>
  <div>
    <div class="ali-pay">
      <!-- 用loading控制效果开光 -->
      <loading v-if="loading"></loading>  
      <!-- 接口会返回html源码，所以要用v-html -->
      <!-- 渲染之后会出现script脚本，我们要帮助实现跳转 ，submit就行了，我们需要实现一个动画组件-->
      <div class="form" v-html="content"></div>  
    </div>
  </div>
</template>
<script>
import Loading from '../components/Loading.vue';
export default{
  name:'alipay',
  components:{
    Loading
  },
  data(){
    return {
      orderId:this.$route.query.orderId,  //从url上面获取用户id  
      content:'',
      loading:true
    }
  },
  mounted() {
    this.paySubmit();
  },
  methods:{
    paySubmit(){
      this.axios.post('/pay',{
        orderId:this.orderId,
        orderName:'商城官网练习',
        amount:0.01,  //单位元
        payType:1,
      }).then((res)=>{  //res就是data里面的数组，在main.js里面已经拦截过了
        this.content = res.content;  //拿到之后需要触发表单
        setTimeout(()=>{
          document.forms[0].submit();  //就会跳转到支付页面
        },100)
      })  //返回的值带网关签名，提高安全性，返回的form会被渲染到页面中
    }
  }
}
</script>
