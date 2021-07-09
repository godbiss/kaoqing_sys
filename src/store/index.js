import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
      userid: 0,
      email: '',
      username: '',
      usertype: 0
    },
    errorMsg: "",
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',   // token
  },
  getters: {    // 监听数据变化的
    getStorage(state) {   // 获取本地存储的登录信息
      if (!state.token) {
        state.token = JSON.parse(localStorage.getItem(key))
      }
      return state.token
    }
  },
  mutations: {
    setErrorMsg(state, msg) {
      state.errorMsg = msg
    },

    $_setToken(state, value) { // 设置存储token
      state.token = value;
      localStorage.setItem('token', value);
    },
    $_removeStorage(state, value) {  // 删除token
      localStorage.removeItem('token');
    },
    $_setUser(state, user) { // 设置存储user
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    $_removeUser(state) {  // 删除user
      localStorage.removeItem('user');
    },
  }
})