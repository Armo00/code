import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'
import StudentHome from '../components/studentHome.vue'
import AdminHome from '../components/adminHome.vue'
import TeacherHome from '../components/teacherHome.vue'


import { Message } from 'element-ui';

//Vue.prototype.$message = Message;
//



Vue.use(VueRouter)



const router = new VueRouter({
     routes : [
        { path: '/', redirect: '/login' },
        { path: '/home', component: Home },
        { path: '/student/home', component: StudentHome},
        { path: '/teacher/home', component: TeacherHome },
        { path: '/admin/home', component: AdminHome },
        { path: '/login', component: Login, title: '登录' }
    ]

})

//挂载路由守卫  load router guard
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    //获取token get token
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) {
        console.log('No Token');
        return next('/login');
    }
    if (to.path == '/student/home' && tokenStr != '0') {
        //this.$message.error('您没有权限访问');
        console.log('您没有权限访问');
        Vue.use(Message.error('You Do Not Have The Authority To Access This Page'));
        next('/login');
    }
    if (to.path == '/teacher/home' && tokenStr != '1') {
        //this.$message.error('您没有权限访问');
        console.log('您没有权限访问');
        Vue.use(Message.error('You Do Not Have The Authority To Access This Page'));
        next('/login');
    }
    if (to.path == '/admin/home' && tokenStr != '2') {
        //this.$message.error('您没有权限访问');
        console.log('您没有权限访问');
        Vue.use(Message.error('You Do Not Have The Authority To Access This Page'));
        next('/login');
    }
    next();
})

export default router
