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

app.get("/movieTable",function(request,response){  
    db.query('SELECT * from contents', function(err, rows, fields) {  
    db.end(); 
    
    if (!err){  
        var data="<html><head><title>mysql test</title></head>"  
        data += "<h1>영화목록</h1>"  
        data += "<table border=\"1\">"    
        data += "<tr> <th>content_id</th> <th>title</th>  <th>summary</th> <th>production_country</th> <th>field_genre</th>  <th>screening_date</th> <th>age_imformation</th>  <th>director</th> </tr>"  

        for (var i in rows) {  
            data += "<tr>"  
            data += "<td>"+rows[i].content_id +"</td>"  
            data += "<td>"+rows[i].title+"</td>";  
            data += "<td>"+rows[i].summary+"</td>";  
            data += "<td>"+rows[i].production_country+"</td>";  
            data += "<td>"+rows[i].field_genre+"</td>";  
            data += "<td>"+rows[i].screening_date+"</td>";  
            data += "<td>"+rows[i].age_imformation+"</td>";
            data += "<td>"+rows[i].director+"</td>";
            data += "</tr>"  
        }  

        data+="</table></html>"  
        response.send(data);  
    }  
    else  
        console.log('Error while performing Query.');  
    });  
});  

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});

app.post('/login', (req, res) => {
    console.log("서버 실행 됨");
    console.log("req.body : " + JSON.stringify(req.body));
    
    var id = req.body.postId;   // login.html 에서 id, pw 값을 받아옴
    var pw = req.body.postPw;
    console.log("get_id : " + id + " , get_pw : " + pw);

    res.send({msg:"success"});

    // var succFn = function(err, row) {
    //     console.log("succFn data : " + row);
    
    //     // 클라이언트(Login_Form.js) 쪽으로 전달
    //     res.send({result:true, msg:"success"});
    // };

    // succFn();
});