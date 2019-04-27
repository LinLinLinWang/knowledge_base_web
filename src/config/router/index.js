import Router from 'vue-router';
import Layout from '../../components/views/Home.vue'
import studentRouter from './student'
import teacherRouter from "./teacher";

export const constantRouterMap = [
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: resolve => require(['../../components/views/Login.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        children: [
            {
                path: '/dashboard',
                component: resolve => require(['../../components/views/Dashboard.vue'], resolve),
                hidden: true,
                meta: {title: 'dashboard'}
            }
        ]
    },
    {
        path: '/404',
        hidden: true,
        component: resolve => require(['../../components/views/404.vue'], resolve),
        meta: {title: '404'}
    }
];

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})


export const asyncRouterMap = [
    studentRouter,
    teacherRouter,
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];
