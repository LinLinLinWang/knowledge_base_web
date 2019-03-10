const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

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
    },
    chainWebpack: config => {
        config.module
            .rule('svg')
            .uses.clear();
        config.module
            .rule('svg1')
            .test(/\.svg$/)
            .use('svg-sprite')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
            .include
            .add(resolve('src/components/icon/svg'))
            .end()
    }
};
