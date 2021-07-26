const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(
        '/movies',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(
        '/login_check.html',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

};