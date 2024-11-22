const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://52.79.44.246:8080',
            changeOrigin: true,
        })
    );
};
