const express = require('express');
const app = express();
const port = 3333;
const db = require('./db_access/db');

// body-parser 모듈을 express.js에서 자체 제공함
app.use(express.json());
app.use(express.urlencoded({extended : false}));

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

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});

app.post('/login', function(req, res) {
    console.log("서버 실행 됨");
    
    var id = req.body.id;   // login.html 에서 id, pw 값을 받아옴
    var pw = req.body.pw;
    var url = req.url.replace("/", "");

    console.log("get_id : " + id + " , get_pw : " + pw);

    var succFn = function(err, row) {
        console.log("succFn data : " + row);
    
        // 클라이언트(Login_Form.js) 쪽으로 전달
        res.send({result:true, msg:"success"});
    };

    succFn();
});