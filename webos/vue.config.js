const path = require('path')

module.exports = {
    // 选项...
    // baseUrl: "./",
    // outputDir: "dist",
    // assetsDir: "assets",
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    lintOnSave: false,
    configureWebpack: {
        devtool: 'source-map'
    }
}