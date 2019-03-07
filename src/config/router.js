import Router from 'vue-router';

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
        component: resolve => require(['../components/views/Home.vue'], resolve),
        children: [
            {
                path: '/',
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    title: '系统首页'
                },
                component: resolve => require(['../components/views/Dashboard.vue'], resolve),
            },
            {
                path: '/info',
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
        path: '/test1',
        component: resolve => require(['../components/views/Test1.vue'], resolve),
        // alwaysShow: true, // will always show the root menu
        meta: {
            title: 'test1',
            // icon: 'lock',
            roles: ['1'] // you can set roles in root nav
        }
    },
    {
        path: '/test2',
        component: resolve => require(['../components/views/Test2.vue'], resolve),
        // alwaysShow: true, // will always show the root menu
        meta: {
            title: 'test2',
            // icon: 'lock',
            roles: ['2'] // you can set roles in root nav
        }
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];
