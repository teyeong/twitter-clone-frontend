const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://43.202.14.234:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    );
};