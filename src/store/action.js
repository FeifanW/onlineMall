//商城Vuex-actions,导出的Object对象最终会渲染在index.js里面
export default {
  saveUserName(context,username) {
    context.commit('saveUserName',username)
  },
  //购物车数量
  saveCartCount(context, count) {
    context.commit('saveCartCount',count)
  }
}









