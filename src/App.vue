<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import storage from './storage'
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      res:{}
    }
  },
  mounted() {
    // 本地请求加载静态json文件的形式
    // this.axios.get('/mock/user/login.json').then((res)=>{
    //   this.res = res;
    // })
    //
    // 本地集成mockjs实现数据mock
    // this.axios.get('/user/login').then((res)=>{
    //   this.res = res;
    // })
    this.getUser();
    this.getCartCount();
  },
  methods:{
    getUser(){  //获取用户信息，接口在用户接口文档里面
      this.axios.get('/user').then(()=>{
        // to-do 保存到vuex里面
      })
    },
    getCartCount() { //获取购物车的数量
      this.axios.get('/carts/products/sum').then(()=>{
        // to-do 保存到vuex里面
      })
    }
  }
}
</script>

<style lang="scss">
/* 引入reset.css 覆盖掉浏览器内置样式 */
/* 样式里面引入样式不能直接import，需要在前面加一个@ */
@import './assets/scss/reset.scss';
@import './assets/scss/mixin.scss';
@import './assets/scss/config.scss';
@import './assets/scss/modal.scss';
@import './assets/scss/button.scss';
</style>
