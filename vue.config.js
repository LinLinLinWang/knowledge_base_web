module.exports = {
    configureWebpack: {
        externals: {
            "vue": "Vue",
            "vuex": "Vuex",
            "vue-router": "VueRouter",
            "element-ui": "ELEMENT",
            'axios': 'axios'
        }
    },
    devServer: {
        disableHostCheck: true
        //关闭域名检查
    }
}
