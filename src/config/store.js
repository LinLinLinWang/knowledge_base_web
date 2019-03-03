// import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

// Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user:null,
        token: null,
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
        },
        [types.SETUSER]: (state, data) => {
            localStorage.user = data;
            state.user = data;
        }
    }
})
