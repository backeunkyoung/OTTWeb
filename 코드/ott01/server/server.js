const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;
const db = require('./db_access/db');

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

app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});

app.post('/login', function(req, res) {
    console.log("서버 실행 됨");
    var id = req.id;   // Login_Form.js 에서 id, pw 값을 받아옴
    var pw = req.pw;
    console.log(req.body);
    console.log("input id : ", id , " , input pw : ", pw);

    var succFn = function(err, row) {
        console.log("succFn data : " + row);
    
        // 클라이언트(Login_Form.js) 쪽으로 전달
        res.send({result:true, msg:"success"});
    };

    succFn();
});