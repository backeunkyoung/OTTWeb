const express = require('express')  // express 모듈 : 미들웨어 구조를 통해 개발자가 필요로 하는 라이브러리만 골라서 사용 가능
const app = express()    // 서버 생성 ( = 서버 애플리케이션 객체를 생성)
const port = 3333;      // 서버의 포트 번호

app.get('/', function(req, res) {  // 클라이언트가 페이지를 요청하면 실행
    res.redirect('/localhost:3333');    // 페이지 이동
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

app.post('/login_check.html', function(req, res) {  // 클라이언트가 페이지 요청 시, DB에서 회원 정보를 확인 => 적절한 메시지 전달
    var id = req.body.id;   // login.html 에서 id, pw 값을 받아옴
    var pw = req.body.pw;

    console.log("input id : ", id , " , input pw : ", pw);

    var succFn = function(err, row) {
        res.send({result:true, msg:"success"});
    };
    
    db_execute(query, succFn);  // 비동기로 DB 조회후 결과에 따른 처리

});