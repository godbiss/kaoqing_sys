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
import Tkaoqin from '@/views/Tkaoqin'
import AHome from "@/views/AHome"
import AMine from "@/views/AMine"
import Akebiao from "@/views/Akebiao"
import Qiandao from '@/views/Qiandao'
import QiandaoPanel from "@/views/QiandaoPanel"
import Qingjia from "@/views/Qingjia"
import Tqingjia from "@/views/Tqingjia"
import QingjiaList from "@/views/QingjiaList"
import QingjiaPanel from "@/views/QingjiaPanel"
import QrScan from "@/views/QrScan"
import Baogao from "@/views/Baogao"
import TQrCode from "@/views/TQrCode"

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
        },
        { path:'/stdHome/qiandao', name:'Qiandao', component:Qiandao},
        { path:'/stdHome/qiandaoPanel', name:'QiandaoPanel', component:QiandaoPanel},
      ],
      meta: {
        requireAuth : true,
        requirePhone : true
      }
    },
    { path:'/std/qingjia', name:"Qingjia", component:Qingjia },
    { path:'/std/qingjiaList', name:"QingjiaList", component:QingjiaList },
    { path:'/std/qingjiaPanel', name:"QingjiaPanel", component: QingjiaPanel},
    { path:'/std/qrScan', name:"QrScan", component:QrScan },
    { path:'/std/baogao', name:"Baogao", component:Baogao },
    {
      path:'/tHome',
      name:"THome",
      component:THome,
      children:[
        { path:'/tHome/tinterBanji', name:'TinterBanji', component:TinterBanji},
        { path:'/tHome/tkaoqin', name:'Tkaoqin', component:Tkaoqin},
        {
          path:'/tHome/tMine',
          name:'TMine',
          component:TMine
        },
        { path:'/tHome/tqingjia', name:'Tqingjia', component:Tqingjia },
        { path:'/tHome/tQrCode', name:'TQrCode', component:TQrCode },
      ]
    },
    {
      path:'/aHome',
      name:'AHome',
      component:AHome,
      children:[
        { path:'/aHome/aMine', name:'AMine', component:AMine},
        { path:'/aHome/akebiao', name:'Akebiao', component:Akebiao},
      ]
    },
    {
      path:'/register',
      name:'Register',
      component: Register,
    }
  ]
})
