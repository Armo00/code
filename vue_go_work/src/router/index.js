import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'
import StudentHome from '../components/studentHome.vue'

Vue.use(VueRouter)

  const routes = [
      { path: '/', redirect: '/login' },
      { path: '/home', component: Home },
      { path: '/student/home', component: StudentHome },
      { path: '/login',component: Login}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
