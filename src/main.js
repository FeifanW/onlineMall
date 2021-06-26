import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store' //index可以省略不写，因为默认是index.js
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
  let path = location.hash;  //获取路由，如果在首页的话，就不要跳转了
  if(res.status == 0){  //0代表成功
    return res.data;  //这个才是接口返回的值
  }else if(res.status == 10){  //只要不是0，肯定就是错误，比如公司里面定义10是未登录
    if(path != '#/index'){  //不是首页才跳转
      window.location.href = '/#/login'  //跳转到首页
    }
    return Promise.reject(res);
  }else {
    //弹出错误信息
    Message.warning(res.msg)
    return Promise.reject(res); //报错之后不希望进来
  }
})

// 使用这个插件
Vue.use(VueCookie);
//Vue.use(Message); //使用组件
Vue.use(VueLazyLoad,{  //第二个参数是全局配置
  loading:'/imgs/loading-svg/loading-bars.svg'  //就是加载的时候的动画
})
Vue.prototype.$message = Message;  //把这个方法挂载的原型上
Vue.config.productionTip = false

new Vue({
  store, //导入的对象需要放到vue实例中
  router,
  render: h => h(App),
}).$mount('#app') //挂载到id为app的dom中的意思
