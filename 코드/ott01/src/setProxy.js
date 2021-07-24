const proxy = require('http-proxy-middleware');

// 클라이언트 사이드에서 Node.js 서버 사이드인 http://localhost:3333/api 로의 요청을 처리하여
// 서버 데이터를 가져 올 수 있도록 해준다.
module.exports = function(app) {
    app.use(
        proxy('/api', {
            target : 'http://localhost:3333/',
            changeOrigin: true,
        })
    );
};