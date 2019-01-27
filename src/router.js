import Router from 'vue-router'

// Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            component: resolve => require(['./components/views/Home.vue'], resolve)
        },
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['./components/views/Test.vue'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['./components/views/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
