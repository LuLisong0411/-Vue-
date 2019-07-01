import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shoppingMall from '@/components/pages/shoppingMall'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/helloWorld',name: 'HelloWorld',component: HelloWorld},
    {path: '/',name: 'shoppingMall',component: shoppingMall}
  ]
})
