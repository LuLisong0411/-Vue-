import Vue from 'vue'
import Router from 'vue-router'
import shoppingMall from '@/components/pages/shoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'shoppingMall',component: shoppingMall},
    {path: '/register',name: 'Register',component:Register},
    {path: '/Login',name: 'Login',component:Login}
  ]
})
