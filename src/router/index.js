import Vue from 'vue'
import Router from 'vue-router'
import StdHome from '@/views/StdHome'
import Login from '@/views/Login'
import ErrorMsg from '@/views/ErrorMsg'
import Register from '@/views/Register'
import Mine from '@/views/Mine'
import StdHomePage from '@/views/StdHomePage'

Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/stdHome/stdHomePage"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/errorMsg',
      name: 'ErrorMsg',
      component: ErrorMsg
    },
    {
      path:'/stdHome',
      name:'StdHome',
      component: StdHome,
      children:[
        {
          path: '/stdHome',
          redirect: '/stdHome/stdHomePage'
        },
        {
          path:'/stdHome/stdHomePage',
          name:'StdHomePage',
          component:StdHomePage
        },
        {
          path:'/stdHome/mine',
          name:'Mine',
          component:Mine
        }
      ],
      meta: {
        requireAuth : true,
        requirePhone : true
      }
    },
    {
      path:'/register',
      name:'Register',
      component: Register,
    }
  ]
})
