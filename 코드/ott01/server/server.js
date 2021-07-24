const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/index');
const port = 3333;
const db = require('./db_access/db');

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요");
})

app.get('/api/products', (req, res) => {
    db.query("SELECT * FROM movies_db.contents;", (err, data) => {
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

app.post('/login_check.html', function(req, res) {
    console.log("서버 실행 됨");
    var id = req.body.id;   // login.html 에서 id, pw 값을 받아옴
    var pw = req.body.pw;
    console.log(req.body);
    console.log("input id : ", id , " , input pw : ", pw);

    var succFn = function(err, row) {
        console.log(row);

        // 클라이언트(Login_Form.js) 쪽으로 전달
        res.send({result:true, msg:"success"});
    };
});