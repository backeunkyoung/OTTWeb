const express = require('express');
const app = express();
const port = 3333;
const db = require('./db_access/db');

// body-parser 모듈을 express.js에서 자체 제공함
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/movies', (req, res) => {
    db.query("SELECT * FROM movies_db.contents;", (err, data) => {
        if (!err) {
            res.send({products : data});
        }
        else {
            res.send(err);
        }
    })
})

app.get('/boxoffice', (req, res) => {
    db.query("SELECT * FROM movies_db.boxoffice;", (err, data) => {
        if (!err) {
            res.send({products : data});
        }
        else {
            res.send(err);
        }
    })
})

app.post("/movieTable",function(request,response) {
    console.log("서버쪽 movieTable");
    
    db.query('SELECT * from contents', function(err, row) {
    
    if (!err){  
        // var data="<html><head><title>mysql test</title></head>"  
        // data += "<h1>영화목록</h1>"  
        // data += "<table border=\"1\">"    
        // data += "<tr> <th>content_id</th> <th>title</th>  <th>summary</th> <th>production_country</th> <th>field_genre</th>  <th>screening_date</th> <th>age_imformation</th>  <th>director</th> </tr>"  

        // for (var i in rows) {  
        //     data += "<tr>"  
        //     data += "<td>"+rows[i].content_id +"</td>"  
        //     data += "<td>"+rows[i].title+"</td>";  
        //     data += "<td>"+rows[i].summary+"</td>";  
        //     data += "<td>"+rows[i].production_country+"</td>";  
        //     data += "<td>"+rows[i].field_genre+"</td>";  
        //     data += "<td>"+rows[i].screening_date+"</td>";  
        //     data += "<td>"+rows[i].age_imformation+"</td>";
        //     data += "<td>"+rows[i].director+"</td>";
        //     data += "</tr>"  
        // }  

        // data+="</table></html>"  
        response.send({data : row});  
    }  
    else  
        console.log('에러 발생 => ' + err);  
    });  
});  

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});

app.post('/login', (req, res) => {
    // console.log("서버 실행 됨");
    // console.log("req.body : " + JSON.stringify(req.body));
    
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

app.post('/overlapCheck', (req, res) => {
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

app.post('/registration', (req, res) => {
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
