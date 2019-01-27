import axios from 'axios';
import store from "../store";

export default axios;

axios.defaults.baseURL = 'http://dm.aloli.cn:8888';  //之后的url直接写/xxx
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //改为表单提交
axios.defaults.withCredentials = true; //携带cookie
axios.defaults.headers.common['Authentication-Token'] = store.state.token;
axios.interceptors.request.use(function (config) {
    // 在发送请求之前,格式化参数，增加token
    let data = config.data;
    let params = new URLSearchParams() //将参数转换为url的形式
    for (var key in config.data) {
        params.append(key, data[key])
    }
    config.data = params;
    return config;
}, function (error) {
    return Promise.reject(error);
});
