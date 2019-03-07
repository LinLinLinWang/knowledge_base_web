// import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import { asyncRouterMap, constantRouterMap } from './router'

// import permission from './permission'
// Vue.use(Vuex);

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    });
    return res
}


export default new Vuex.Store({
    state: {
        user: null,
        token: null,
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data.token;
            // localStorage.user = JSON.stringify(data.user);
            state.token = data.token;
            // state.user = data.user;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user = null;
        },
        [types.SETUSER]: (state, data) => {
            localStorage.user = JSON.stringify(data.user);
            state.user = data.user;
        }
    },
    actions: {
        // 获取用户信息
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                this.$axios({
                    method: 'POST',
                    url: '/users/getInfo',
                }).then(response => {
                    var resdata = response.data;
                    var jsonuser = eval('(' + resdata.user + ')');
                    commit(types.SETUSER, jsonuser);
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //生成路由
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data
                let accessedRouters
                if (roles.includes('0')) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        },
        //未授权访问
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit(types.LOGOUT);
                resolve()
            })
        },
    }
})
