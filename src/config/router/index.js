import Router from 'vue-router'
import * as types from '../types'
import store from "../store";

// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
    this.$store.commit(types.LOGIN, sessionStorage.getItem('token'))
}

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            component: resolve => require(['../../components/views/Home.vue'], resolve)
        },
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['../../components/views/Test.vue'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../../components/views/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        console.log(store.state);
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

export default router;
