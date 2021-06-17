//入口文件，也包括状态的入口
import Vue from 'vue' //首先导入Vue
import Vuex from 'vuex' 
import mutations from './mutations' 
import actions from './action' 
Vue.use(Vuex);  //使用Vuex插件


const state = {
  username:'', //登录用户名
  cartCount:0  //购物车商品数量
}
//导出
export default new Vuex.Store({
  state,
  mutations,
  actions
})