//商城Vuex-mutations
export default {
  saveUserName(state,username) { //最后一步就是读取了
    state.username = username;
  },
  saveCartCount(state, count) {
    state.cartCount = count;
  }
}