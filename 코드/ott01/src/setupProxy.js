const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/hello',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(
        '/movies',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

};