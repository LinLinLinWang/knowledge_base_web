import Vue from 'vue';
import App from './App.vue'; //首页
import store from './config/store'; //状态管理
import * as types from "./config/types"; //状态管理类型
import axios from './config/axios'; //网络请求
import router from './config/router'; //路由
import './config/permission'; //权限验证
import ELEMENT from 'element-ui'; //ui
import vuescroll from 'vuescroll'; //滚动条
import './assets/css/icon.css'; //icon
import './components/icon' // icon
import 'element-ui/lib/theme-chalk/display.css'; //mobile css

//去除警告
Vue.config.productionTip = false;

//判断设备类型,使用不同尺寸的组件大小
let userAgentInfo = navigator.userAgent;
let Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
let flag = false;
for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = true;
        break;
    }
}
if (flag) {
    Vue.use(ELEMENT, {
        size: 'mini'
    });
    store.commit(types.SET_PC, false);
} else {
    Vue.use(ELEMENT);
}

//注册全局变量
Vue.prototype.$axios = axios;

//启用浏览器的devtools拓展
Vue.config.devtools = true;

//滚动条插件
Vue.use(vuescroll, {
    ops: {}, // 在这里设置全局默认配置
    name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
});

new Vue({
    store,
    axios,
    router,
    render: h => h(App)
}).$mount('#app');
