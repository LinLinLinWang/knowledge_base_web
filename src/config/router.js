import Router from 'vue-router';
import Layout from '../components/views/Home.vue'


export const constantRouterMap = [
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: resolve => require(['../components/views/Login.vue'], resolve)
    }, {
        path: '/registe',
        name: 'registe',
        hidden: true,
        component: resolve => require(['../components/views/Registe.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        children: [
            {
                path: '/dashboard',
                meta: {
                    title: '系统首页'
                },
                component: resolve => require(['../components/views/Dashboard.vue'], resolve),
            }
        ]
    },
    {
        path: '/info',
        redirect: '/info/index',
        component: Layout,
        children: [
            {
                path: '/index',
                component: resolve => require(['../components/views/ChangeInfo.vue'], resolve),
                meta: {title: '信息维护'}
            }
        ]
    },
    {
        path: '/404',
        hidden: true,
        component: resolve => require(['../components/views/404.vue'], resolve),
        meta: {title: '404'}
    }
];

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})


export const asyncRouterMap = [
    {
        path: '/test',
        component: Layout,
        meta: {
            roles: ['1', '2']
        },
        children: [
            {
                path: '/test1',
                // name: 'test1',
                component: resolve => require(['../components/views/Test1.vue'], resolve),
                meta: {
                    title: 'test1',
                    roles: ['1']
                }
            },
            {
                path: '/test2',
                component: resolve => require(['../components/views/Test2.vue'], resolve),
                meta: {
                    title: 'test2',
                    roles: ['2']
                }
            }
        ]
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];
