import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//import global CSS
import './assets/css/global.css'
//import network related stuff
import axios from 'axios'
//���������·�� config the baseURL for the request
//axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
axios.defaults.baseURL ='http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
