const express = require('express');
const app = express();
const port = 3333;
const db = require('./db_access/db');

// body-parser 모듈을 express.js에서 자체 제공함
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.listen(port, ()=>{  // 서버 실행 확인
    console.log(`express is running on ${port}`);
});

app.get('/boxoffice', (req, res) => {   // boxoffice 랭킹 가져오기
    var query = "SELECT * FROM movies_db.boxoffice;"

    db.query(query, (err, data) => {
        if (!err) {
            res.send({products : data});
        }
        else {
            res.send(err);
        }
    })
})

app.post("/movieTable",function(req,res) {  // 영화 테이블 가져오기
    console.log("서버쪽 movieTable");

    var query = "SELECT * from contents"
    
    db.query(query, function(err, row) {
    
    if (!err){  
        res.send({data : row});  
    }  
    else  
        console.log('에러 발생 => ' + err);  
    });  
});  

app.post("/get_genre_name", function(req,res) { // 국가 목록 가져오기
    var movieCodes = req.body.postCodes;
    var codes = movieCodes.split(',');
    var output = '';
    
    codes.forEach(element => {
        console.log("받은 codes : " + element); 
    
        var query = "select attribute_name from movies_db.attribute_genres where attribute_num=" + Number(element) + ";";
    
        db.query(query, function(err, row) {
            output += (row + ",")
        });
    });

    console.log("output : " + output);

    if (!err){  
        res.send({data : output});  
    }  
    else {  
        console.log('에러 발생 => ' + err);  
    }
}); 

app.post('/login', (req, res) => {  // 로그인 처리
    var id = req.body.postId;
    var pw = req.body.postPw;
    console.log("get_id : " + id + " , get_pw : " + pw);

    var query = "select id from movies_db.users where id= '" + id + "';";

    db.query(query, function (err, row) {
        if (err) {
            console.log('err :' + err);
        } else {
            console.log("id query문 결과 : " + JSON.stringify(row));
            if (row.length === 0 ) {    // 검색 결과가 0이면 등록 x
                console.log("등록되지 않은 id 입니다.");
                res.send({nic_name : undefined, msg:"id_fail"}); // 클라이언트(login.html) 쪽으로 전달
            } else {
                query = "select pw from movies_db.users where id= '" + id + "';";
                db.query(query, function (err, row) {
                    console.log("pw query문 결과 : " + JSON.stringify(row));
                    if (row[0].pw !== pw) {
                        console.log("비교한 pw : " + pw);
                        console.log("잘못된 비밀번호 입니다.");
                        res.send({nic_name : undefined, msg:"pw_fail"});
                    } else {
                        console.log("로그인에 성공하셨습니다.");
                        query = "select nic_name from movies_db.users where id= '" + id + "';";
                        db.query(query, function (err, row) {
                            console.log("nic_name query문 결과 : " + JSON.stringify(row));
                            res.send({nic_name : row[0].nic_name, msg:"success"});
                        })
                    }
                })
            }
        }
    });
});

app.post('/overlapCheck', (req, res) => {   // 회원가입 시 ID 중복체크
    console.log("overlap 체크 서버 실행 됨");
    console.log("req.body : " + JSON.stringify(req.body));
    
    var id = req.body.postId;
    
    console.log("get_id : " + id);

    var query = "select id from movies_db.users where id= '" + id + "';";

    db.query(query, function (err, row) {
        if (err) {
            console.log('err : ' + err);
        }
        else {
            if (row.length !== 0) { // id 중복
                res.send({msg : "id_fail"});
            }
            else {
                res.send({msg : "success"});
            }
        }
    })   
});

app.post('/registration', (req, res) => {   // 회원가입 처리
    console.log("서버 실행 됨");
    console.log("req.body : " + JSON.stringify(req.body));
    
    var id = req.body.postId;
    var pw = req.body.postPw;
    var nic_name = req.body.postNicName;
    var age = req.body.postAge;
    
    console.log("get_id : " + id + ", get_pw : " + pw + ", get_nic_name : " + nic_name + ", get_age : " + age);

    var query = "insert into movies_db.users(`id`,`pw`,`nic_name`,`age`)VALUES('" + id + "','" + pw + "','" + nic_name + "','" + age + "')";

    db.query(query, function (err, row) {
        if (err) {
            console.log('err : ' + err);
        }
        else {
            res.send({msg : "success"});
            console.log("성공");
        }
    })
});

app.post("/genres_list", function(req,res) { // 장르 목록 가져오기
    console.log("서버쪽 genres_list");

    var query = "select * from movies_db.attribute_genres;";
    
    db.query(query, function(err, row) {
    
    if (!err){  
        res.send({data : row});  
    }  
    else  
        console.log('에러 발생 => ' + err);  
    });  
});  

app.post("/countrys_list", function(req,res) { // 국가 목록 가져오기
    console.log("서버쪽 countrys_list");

    var query = "select * from movies_db.production_countrys;";
    
    db.query(query, function(err, row) {
    
    if (!err){  
        res.send({data : row});  
    }  
    else  
        console.log('에러 발생 => ' + err);  
    });  
});  

app.post('/country', (req, res) => {    // 국가 필터 
    console.log("서버쪽 /country 실행됨");
    res.send({msg : "country success"});

    // console.log("tag")

    // var tag = req.body.postCountry;
    // var data;

    // var sql = "SELECT * FROM contents WHERE (production_country LIKE ? OR production_country LIKE ? OR production_country LIKE ? OR production_country LIKE ?)";
    // var params = [tag,tag+",%","%,"+tag,"%,"+tag+",%"];

    // conn.query(sql,params, (err,row) => {
    //     if(err) {
    //         console.log('err : ' + err);
    //     }
    //     else {     
    //         res.send(data);
    //     }
    // });
});