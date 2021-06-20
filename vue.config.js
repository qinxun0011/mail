module.exports = {
    configureWebpack: {
        resolve: {
            extensions: [],
            //配置别名
            alias: {
                //默认配置了
                //'@': 'src'
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },

    css: {
      sourceMap: true
    }
}
