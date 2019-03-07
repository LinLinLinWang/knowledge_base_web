import router from './router'
import store from './store'
// import {Message} from 'element-ui'
import * as types from "./types";

// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
    store.commit(types.LOGIN, {
        token: localStorage.getItem('token'),
        user: eval("(" + localStorage.getItem('user') + ")")
    });
} else {
    router.push('/login');
}


//免登录页面
const whiteList = ['/login', '/registe', '/404'];// no redirect whitelist

router.beforeEach((to, from, next) => {
    console.log("1to: " + to.path);

    //不需要登录
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        console.log("2to - whiteList ");
        next();
        return;
    }

    console.log("3token: " + store.state.token);


    //判断token
    if (store.state.token == null) {
        console.log("4to - login ");
        next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
    } else if (store.state.norouter) {
        console.log("5user: " + store.state.user);
        const roles = ['' + store.state.user.type];
        console.log("6roles : " + roles);
        store.dispatch('GenerateRoutes', {roles}).then(() => { //根据roles权限生成可访问的路由表
            router.addRoutes(store.state.addRouters); // 动态添加可访问路由表
            next({...to, replace: true}) //确保addRoutes已完成
        });
        console.log("7to - getuser finsh");
    } else {
        console.log("8next");
        next();
    }


});
