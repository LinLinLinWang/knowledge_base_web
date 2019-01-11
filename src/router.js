import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
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
