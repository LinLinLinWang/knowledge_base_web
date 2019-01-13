import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios';
// import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
// Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//             next();
//         }
//         else {
//             next({
//                 path: '/login',
//                 query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next();
//     }
// })

new Vue({
    store,
    axios,
    router,
    render: h => h(App)
}).$mount('#app')
