const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(    // 로그인 처리
        '/login',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 회원가입 시 ID 중복 체크
        '/overlapCheck',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 회원가입 처리
        '/registration',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 장르 목록 불러오기
        '/genres_list',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 장르 코드로 장르 명 가져오기
        '/get_genre_name',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 국가 목록 불러오기
        '/countrys_list',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 국가 코드로 국가 명 가져오기
        '/get_country_name',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 배우 코드로 출연 배우 목록 불러오기
        '/get_actor_name',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 연도 목록 불러오기
        '/years_list', 
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

    app.use(    // 검색 결과 받아오기
        '/search_result',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );
    
    app.use(    // boxoffice 랭킹 불러오기
        '/boxoffice',
        createProxyMiddleware({
            target: 'http://localhost:3333',
            changeOrigin: true,
        })
    );

};