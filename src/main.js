import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import App from './App.vue'  //不加./它会认为是个插件
//import env from './env'

//import是预编译加载，require是从上到下执行的时候才加载
Vue.prototype.axios = axios
const mock = false;  //mock开关，false的话下面的代码不会加载，不会被拦截
if(mock) {
  require('./mock/api')  //定义好之后加载
}

// 根据前端的跨域方式做调整 /a/b: /api/a/b => /a/b
axios.defaults.baseURL = '/api';  //代理的方法很简单，就是/api
axios.defaults.timeout = 8000;  //超时处理
//根据不同的环境变量获取不同的请求地址
//axios.defaults.baseURL = env.baseURL;
//接口错误拦截
axios.interceptors.response.use(function(response) {  //对错误进行处理，response是axios这个插件返回给我们的，并不代表返回的值
  let res = response.data;  //response.data才是返回的值
  if(res.status == 0){  //0代表成功
    return res.data;  //这个才是接口返回的值
  }else if(res.status == 10){  //只要不是0，肯定就是错误，比如公司里面定义10是未登录
    window.location.href = '/#/login'  //跳转到首页
  }else {
    alert(res.msg); //弹出错误信息
  }
})

Vue.use(VueLazyLoad,{  //第二个参数是全局配置
  loading:'/imgs/loading-svg/loading-bars.svg'  //就是加载的时候的动画
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app') //挂载到id为app的dom中的意思
