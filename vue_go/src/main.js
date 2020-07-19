import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//import global CSS
import './assets/css/global.css'

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

//import network related stuff
import axios from 'axios'
//���������·�� config the baseURL for the request
axios.defaults.baseURL = 'http://172.46.100.69:7777'
//axios.defaults.baseURL = 'http://172.36.230.36:7777'
//axios.defaults.baseURL ='http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
