import Vue from 'vue';
import App from './App.vue'; //首页
import store from './config/store'; //状态管理
import axios from './config/axios'; //网络请求
import router from './config/router'; //路由
import './config/permission'; //权限验证
import ELEMENT from 'element-ui'; //ui
import VCharts from 'v-charts';//vcharts
import './assets/css/icon.css'; //icon
import './components/icon' // icon

//去除警告
Vue.config.productionTip = false;

//启用Element
// Vue.use(ELEMENT, {
//     size: 'small'
// });
Vue.use(ELEMENT);
Vue.use(VCharts);

//注册全局变量
Vue.prototype.$axios = axios;

//启用浏览器的devtools拓展
Vue.config.devtools = true;

new Vue({
    store,
    axios,
    router,
    render: h => h(App)
}).$mount('#app');
