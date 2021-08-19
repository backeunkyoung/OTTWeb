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
        // console.log("data : " + JSON.stringify(row))
        res.send({data : row});  
    }  
    else  
        console.log('에러 발생 => ' + err);  
    });  
});  

app.post("/years_list", function(req,res) { // 연도 목록 가져오기
    console.log("서버쪽 years_list");

    var query = "select distinct left(screening_date, 4) from movies_db.contents;";
    
    db.query(query, function(err, row) {
    
    if (!err){
        res.send({data : row});  
    }  
    else  
        console.log('에러 발생 => ' + err);  
    });  
}); 

app.post('/country', (req, res) => {    // 국가 필터(미완) 
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

app.post("/search_result", function(req,res) { // 검색 결과 가져오기
    var search = req.body.postKeyword;
    var s = search.replace(/ /g,"");

    //제목, 감독으로 검색( 띄어쓰기 상관 x )
    //var query = "SELECT * FROM contents WHERE REPLACE(title,' ','') LIKE '%" + search + "%' OR REPLACE(director,' ','') LIKE '%" + search + "%';";
    
    var query = "SELECT * FROM contents WHERE REPLACE(title,' ','') LIKE '%" + s + "%' OR REPLACE(director,' ','') LIKE '%" + s + "%';";
    // SELECT * FROM movies_db.contents WHERE REPLACE(title,' ','') LIKE '%반지%' OR REPLACE(director,' ','') LIKE '%반지%';

    db.query(query, function(err, row){
        if (!err){  
            res.send({data : row});
        } 
        else {
            console.log('에러 발생 => ' + err);
        }  
    });
});

app.post("/get_genre_name", function(req,res) { // 장르 이름 가져오기
    
    var query = "select con.content_id, att.attribute_name"
    query += " from movies_db.contents con"
    query += " inner join movies_db.content_attribute conatt on conatt.content_pid = con.content_id"
    query += " inner join movies_db.attribute_genres att on att.attribute_num = conatt.attribute_num"
    query += " order by con.content_id;"
    
    db.query(query, function(err, row){
        if (!err){  
            res.send({data : row});
        } 
        else {
            console.log('에러 발생 => ' + err);
        }  
    });  
});

app.post("/get_country_name", function(req,res) { // 국가 이름 가져오기
    
    var query = "select con.content_id, prod.country_name"
    query += " from movies_db.contents con"
    query += " inner join movies_db.content_country country on country.content_pid = con.content_id"
    query += " inner join movies_db.production_countrys prod on prod.country_code = country.nation_code"
    query += " order by con.content_id;"
    
    db.query(query, function(err, row){
        if (!err){  
            res.send({data : row});
        } 
        else {
            console.log('에러 발생 => ' + err);
        }  
    });  
});

app.post("/get_actor_name", function(req,res) { // 출연 배우 가져오기
    
    var query = "select con.content_id, person.Name"
    query += " from movies_db.contents con"
    query += " inner join movies_db.contents_persons conperson on conperson.content_pid = con.content_id"
    query += " inner join movies_db.person person on person.person_pid = conperson.person_pid"
    query += " order by con.content_id;"
    
    db.query(query, function(err, row){
        if (!err){  
            res.send({data : row});
        } 
        else {
            console.log('에러 발생 => ' + err);
        }  
    });  
});