const path = require('path')

module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    lintOnSave: false
    ,
    configureWebpack:{
        devtool : 'source-map'
    }
}