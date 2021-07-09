import Vue from 'vue'
import Router from 'vue-router'
import StdHome from '@/views/StdHome'
import Login from '@/views/Login'
import ErrorMsg from '@/views/ErrorMsg'
import Register from '@/views/Register'
import Mine from '@/views/Mine'
import StdHomePage from '@/views/StdHomePage'
import CourseTable from '@/views/CourseTable'
import THome from '@/views/THome'
import TMine from '@/views/TMine'
import TinterBanji from '@/views/TinterBanji'
import InterBanji from '@/views/InterBanji'

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
          component:StdHomePage,
        },
        { path:'/stdHome/interBanji', name:'InterBanji', component:InterBanji },
        {
          path:'/stdHome/courseTable',
          name:'CourseTable',
          component:CourseTable
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
      path:'/tHome',
      name:"THome",
      component:THome,
      children:[
        { path:'/tHome/tinterBanji', name:'TinterBanji', component:TinterBanji},
        {
          path:'/tHome/tMine',
          name:'TMine',
          component:TMine
        }
      ]
    },
    {
      path:'/register',
      name:'Register',
      component: Register,
    }
  ]
})
