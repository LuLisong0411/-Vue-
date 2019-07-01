// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//全局引入  打包后体积过大 采用babel-plugin-import比较好
// import Vant from 'vant'
// import 'vant/lib/vant-css/index.css'
// import { userInfo } from 'os';
// Vue user(Vant)
//按需引入  打包后体积较小，速度快
import {Button,Row,Col} from 'vant'
Vue.use(Button).use(Row).use(Col)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
