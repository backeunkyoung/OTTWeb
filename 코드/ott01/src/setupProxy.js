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
        '/movieTable',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(
        '/login',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(
        '/overlapCheck',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(
        '/registration',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(
        '/boxoffice',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

};