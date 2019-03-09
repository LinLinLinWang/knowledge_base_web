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
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
        config.module.rules.delete("svg");
        config.module
            .rule('svg-smart')
            .test(/\.svg$/)
            .include
            .add(resolve('src/components/icon/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
    }

}
