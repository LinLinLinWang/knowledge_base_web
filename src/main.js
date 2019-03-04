import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import axios from './config/axios';
import ELEMENT from 'element-ui';
import './assets/css/icon.css';

//去除警告
Vue.config.productionTip = false

//启用Element
Vue.use(ELEMENT, {
    size: 'small'
});
// Vue.use(ELEMENT);


Vue.use(router);

//注册全局变量
Vue.prototype.$axios = axios;

//启用浏览器的devtools拓展
Vue.config.devtools = true;

new Vue({
    store,
    axios,
    router,
    render: h => h(App)
}).$mount('#app')
