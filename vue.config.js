module.exports = {
    publicPath: './',
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:8000/',
                pathRewrite: {
                    "^/api": "/"
                }
            },
        },
        disableHostCheck: true,
    }
}