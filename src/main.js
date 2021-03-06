// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import { Toast, Dialog, List } from 'vant'
import { Loading } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Panel } from 'vant';
import { PullRefresh } from 'vant';
import { DatetimePicker } from 'vant';
import { ActionSheet, Popup } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { Overlay } from 'vant';

import * as sysTool from "./utils/systemTool.js";

Vue.use(Overlay);
Vue.use(Button);
Vue.use(Field);
Vue.use(Popup);
Vue.use(ActionSheet);
Vue.use(DatetimePicker);
Vue.use(PullRefresh);
Vue.use(Panel);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Loading);
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(ElementUI);


Vue.config.productionTip = false
Vue.prototype.$axios = axios


// 全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {
  if(to.matched.some(m => m.meta.requirePhone)){
      if(!sysTool._isMobile()){
        store.state.errorMsg = "请使用手机登录"
        next({path: '/errorMsg'})
      }else{
        next()
      }
  }    


  if (to.matched.some(m => m.meta.requireAuth)) {    // 需要登录
    if(window.localStorage.token){
      next()
    } else if (to.path !== '/login') {
      let token = window.localStorage.token;
      if (token === 'null' || token === '' || token === undefined){
          next({path: '/login'})
          Toast({ message: '检测到您还未登录,请登录后操作！', duration: 1500 })
      }
    } else {
      next()
    }
  } else {   // 不需要登录
    next()
  }
})

// // 配置公共url
// axios.defaults.baseURL = "http://localhost:80/kaoqin_sys/"
//添加请求拦截器
axios.interceptors.request.use(
  config =>{
    if(store.state.token){
      config.headers.common['token'] =store.state.token
    }
    return config;
  },
  error =>{
    //对请求错误做什么
    return Promise.reject(error);
  })

//http reponse响应拦截器
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error=>{
    if(error.response){
      switch(error.response.status){
        case 401:
          localStorage.removeItem('token');
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
