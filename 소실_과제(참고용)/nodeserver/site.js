var express = require('express')          // express 모듈 : 미들웨어 구조를 통해 개발자가 필요로 하는 라이브러리만 골라서 사용 가능
var bodyParser = require('body-parser'); // body-parser 미들웨어 : 클라이언트에서 서버로 데이터를 전달할 때, Encoding-Type에 따라 확인하고 변환을 도와줌
var sqlite3 = require('sqlite3');         // DB
var port = 7777;                          // 서버의 포트 번호
var app = express();                      // 서버 생성 ( = 서버 애플리케이션 객체를 생성)

var db = new sqlite3.Database(__dirname + '/site.db',(err)=>{   // DB 가져오기, __dirname : 현재 실행 중인 파일 경로
    if(err){    // 실패시 에러 메시지 출력
        console.log(err);
    }else{      // 성공시 성공 메시지 출력
        console.log('Data Connect Success');
    }
});

var db_execute = function(query, succFn) {
    // 직렬화 : 자바 시스템 내부에서 사용되는 Object 또는 Data를 외부의 자바 시스템에서도 사용할 수 있도록 byte 형태로 데이터를 변환
    db.serialize(); // json 으로 처리 하게 해줌 
    db.all(query, succFn);
}

// app.use() : 요청이 왔을 때, 실행할 함수를 지정
app.use(bodyParser.urlencoded({
    extended: true  // qs모듈을 사용하여 쿼리 스트링 값을 해석, * qs : 쿼리 문자열에서 중첩된 개체를 만들 수 있다.
}));


// app.listen() : 서버 실행
var server = app.listen(port, function(){
    console.log("Express server has started on port ", port)
})


// app.set() : express 인스턴스에 변수들을 저장 => express 설정
// 화면 engine을 ejs로 설정 => ejs(Embedded JavaScript) : express에서 dynamic website를 만들기 위해 template으로 사용되는 파일
app.set('views', __dirname + '/site');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); 

app.get('/', function(req, res) {  // 클라이언트가 페이지를 요청하면 실행
    res.redirect('/login.html');    // 페이지 이동
});

app.get(['/login.html','/register.html'], function(req, res) { // 클라이언트가 페이지 요청 시, 해당 페이지로 이동
    var url = req.url.replace("/", ""); // var url = login.html
    res.render(url);    // url 렌더링 => 서버로무터 url 받아 브라우저에 요청에 따른 응답을 보내줌
});

app.post('/login_check.html', function(req, res) {  // 클라이언트가 페이지 요청 시, DB에서 회원 정보를 확인 => 적절한 메시지 전달
    var id = req.body.id;   // login.html 에서 id, pw 값을 받아옴
    var pw = req.body.pw;
    console.log(req.body);
    console.log("input id : ", id , " , input pw : ", pw);

    // DB 검색을 위한 query문 생성 => user table에서 id = 1 인 값들의 id, pw 값을 검색
    var query = " SELECT id, pw from user where id = '" + id +"';";

    var succFn = function(err, row) {
        console.log(row);
        if (row.length === 0 ) {    // 검색 결과가 0이면 등록 x
            console.log("등록되지 않은 id 입니다.");
            res.send({result:true, msg:"id_fail"}); // 클라이언트(login.html) 쪽으로 전달
        } else {
            if (row[0].pw !== pw ) {
                console.log("잘못된 비밀번호 입니다.");
                res.send({result:true, msg:"pw_fail"});
            } else {
                console.log("로그인에 성공하셨습니다.");
                res.send({result:true, msg:"success"});
            }
        }

    };
    
    db_execute(query, succFn);  // 비동기로 DB 조회후 결과에 따른 처리

});

app.post('/user_add.html', function(req, res) { // 클라이언트가 페이지 요청 시, DB에 회원 추가
    var id = req.body.id;
    var pw = req.body.pw;
    var name = req.body.name;
    console.log(req.body);  // 받아온 값 확인
    console.log("add_id : ", id , " , add_pw : ", pw, " , add_name : ", name);

    var check = `SELECT * from user where id ='${id}';`;    // 받아온 id 중복 체크

    var checkFn = function(err, row) {
        if (row.length > 0) {   // 해당 id와 같은 id의 개수가 0개보다 많으면 중복 => 존재하면 중복
            console.log("id 중복");
            res.send({result:true, msg:"fail"});
        } else {    // id가 중복이 아니면 DB에 추가해주기
                
            var succFn = function(err, row) {
                console.log("신규 user 추가 성공");
                res.send({result:true, msg:"success"});
            };

            //insert into user values('1', '1', '1');
            //var query = " INSERT into user values('" + id + "', '" + pw + "', '" + name + "'; ";
            var query = `INSERT into user values('${id}', '${pw}', '${name}');`; // DB에 회원 추가
            query += `insert into time_table values('${id}', '1', '', '', '', '', '', '', '', '', '');`;    // 시간표 추가
            query += `insert into time_table values('${id}', '2', '', '', '', '', '', '', '', '', '');`;
            query += `insert into time_table values('${id}', '3', '', '', '', '', '', '', '', '', '');`;
            query += `insert into time_table values('${id}', '4', '', '', '', '', '', '', '', '', '');`;
            query += `insert into time_table values('${id}', '5', '', '', '', '', '', '', '', '', '');`;

            // Execute multiple statements => Database#exec(sql, [callback])
            db.exec(query, succFn); // 비동기로 DB 조회후 결과에 따른 다중 처리 => query문이 여러 개 일때
        }
    }
    db_execute(check, checkFn)

    //query 실행 해서 결과
    //이상이 없으면 정상
    //이상이 있으면 로그인 페이지로 보냄
})

app.post('/user_page.html', function(req, res) { // 클라이언트가 페이지 요청 시, 회원 페이지로 이동
    var url = req.url.replace("/", "");
    var id = req.body.login_id;
    console.log("login_id : ", id);
    // select * from time_table where id ='2'  order by day_of_week;
    var query = "select * from time_table where id ='" + id + "' order by day_of_week";
    
    var succFn = function(err, row) {   // row : query 결과
        res.render(url, {login_id: id, time_table: row});    // 클라이언트(user_page.html)에게 전달
    };
    
    db_execute(query, succFn);  // 비동기로 DB 조회후 결과에 따른 처리
})

app.post('/subject_update.html', function(req, res) { // 클라이언트가 페이지 요청 시, DB table 수정
    var edit_value = req.body.edit_value;   // 수정 할 과목
    var id = req.body.id;                   // 회원 id 값
    var day_of_week = req.body.day_of_week;
    var start_time = req.body.start_time;

    // update time_table set time_9="network" where id ='2' and day_of_week='1';
    var query = `update time_table set time_${start_time}="${edit_value}" where id ="${id}" and day_of_week="${day_of_week}";`;

    var succFn = function(err, row) {   // row : query 결과
        res.send({result:true, msg:"success"}); // 성공 메세지를 클라이언트로
    };
    
    db_execute(query, succFn);  // 비동기로 DB 조회후 결과에 따른 처리
})

app.post('/table_look.html', function(req, res) { // 클라이언트가 페이지 요청 시, 페이지 이동
    var id = req.body.id;                   // 회원 id 값

    // select * from time_table where id = '2' order by day_of_week;
    var query = `select * from time_table where id ="${id}" order by day_of_week;`;

    var succFn = function(err, row) {   // row : query 결과
        console.log("출력 페이지로 이동")
        res.send({result:true, msg:"success"}); // 성공 메세지를 클라이언트로
    };
    
    db_execute(query, succFn);  // 비동기로 DB 조회후 결과에 따른 처리
})

app.post('/print_time_table.html', function(req, res) { // 클라이언트가 페이지 요청 시, 시간표 출력 페이지로 이동
    var url = req.url.replace("/", "");
    var id = req.body.print_id;
    var query = "select * from time_table where id ='" + id + "' order by day_of_week";
    
    var succFn = function(err, row) {   // row : query 결과
        res.render(url, {print_id: id, time_table: row});    // 클라이언트(user_page.html)에게 전달
    };
    
    db_execute(query, succFn);  // 비동기로 DB 조회후 결과에 따른 처리
})