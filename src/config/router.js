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
                    title: '系统首页',
                    icon: 'dashboard',
                },
                component: resolve => require(['../components/views/Dashboard.vue'], resolve),
            }
        ]
    },
    {
        path: '/',
        redirect: '/information',
        component: Layout,
        children: [
            {
                path: '/information',
                component: resolve => require(['../components/views/ChangeInfo.vue'], resolve),
                meta: {
                    title: '信息维护',
                    icon: 'documentation',
                }
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
        path: '/',
        component: Layout,
        redirect: '/myclass',
        meta: {
            roles: ['2']
        },
        children: [
            {
                path: '/myclass',
                component: resolve => require(['../components/views/student/MyClass.vue'], resolve),
                meta: {
                    title: '我的班级',
                }
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/myinfo',
        meta: {
            roles: ['2']
        },
        children: [
            {
                path: '/myinfo',
                component: resolve => require(['../components/views/student/MyInfo.vue'], resolve),
                meta: {
                    title: '我的考勤',
                }
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/vacate',
        meta: {
            roles: ['2']
        },
        children: [
            {
                path: '/vacate',
                component: resolve => require(['../components/views/student/MyVacate.vue'], resolve),
                meta: {
                    title: '我的请假',
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
