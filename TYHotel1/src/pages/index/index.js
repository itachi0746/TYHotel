// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Cell, Loading, Progress } from 'vant'

import '@/common/rem.js'
import '@/styles/common.css'
import axiosPlugin from '../../common/server'
Vue.use(axiosPlugin)

require('../../common/mock') // 用于模拟数据, 正式环境需要注释掉

// import 'animate.css/animate.min.css'

Vue.use(Button).use(Cell).use(Loading).use(Progress)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
