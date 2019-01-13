import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            // meta: {
            //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            // },
            component: Home
        },
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['./views/Test.vue'], resolve)
        },
        {
            path: '/about',
            name: 'about',
            component: resolve => require(['./views/About.vue'], resolve)
        },
        {
            path: '/login',
            name: 'lgoin',
            component: resolve => require(['./views/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
