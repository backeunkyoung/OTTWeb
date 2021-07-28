var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');           

var conn = mysql.createConnection({
        host    :       '18.188.140.138',
        user    :       'user01',
        password:       '1111',
        database:       'movies_db',
        dateStrings: 'date'
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/Public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res){
                res.render('join');
});

app.post('/receive', function(req, res){
                var id = req.body.user_Id;
                var pw1 = req.body.user_pw1;
                var pw2 = req.body.user_pw2;               
                var nic_name = req.body.user_nick;
                var age = req.body.user_age;

                if(pw1 === pw2){                   

                        conn.query('SELECT * from users', function(err, rows, fields) {  
                         if (!err){     
                              for (var i in rows){  
                                  if(id == rows[i].id){
                                      return res.send("<script>alert('등록된 아이디입니다.'); window.location=\"/\"</script>");
                                     // return res.redirect('/login');
                                  } 
                        }  
             


                 bcrypt.hash(pw1, null, null, function(err, hash){  
                  var sql = 'INSERT INTO users(id, pw, nic_name, age) VALUES(?, ?, ?, ?)';
                  var params = [id, hash, nic_name, age];   
                  const query = conn.query(sql, params, function(err, rows){         
                    if(err){                                          
                     console.log(err);
                     res.status(500).send("ERROR");
                        }
                     console.log('success sign-up!');
                     console.log('hash');
                     res.redirect('/login');
                    });
                  })
                } 
        }     
        
        )}
         
});

app.post('/login_user', function(req, res){         
        var loginid = req.body.login_id;               
        var loginpw = req.body.login_pw;                       
        var loginsql = 'SELECT * FROM users WHERE id = ?';  
                                                                 
        conn.query(loginsql, loginid, function (err, rows, fields) {
               if (err) {
                        console.log('err :' + err);
               } else {
                       console.log(rows);
                       if (rows[0]!=undefined) {
                               if (!bcrypt.compareSync(loginpw, rows[0].pw)) {     
                                       return res.send("<script>alert('비밀번호가 일치하지 않습니다.'); window.location=\"/login\"</script>");
                               } else {
                                       return res.send("<script>alert('로그인 성공'); window.location=\"/board\"</script>");
                               }
                       } else {
                               console.log(rows[0]);
                               return res.send("<script>alert('등록되지 않은 아이디입니다.'); window.location=\"/login\"</script>");
                               //res.redirect('/');
                       }
               }
               })
       });

       app.post('/add', function(req, res){
        
       });


app.post('/show',function(req,res){
        var sql = 'SELECT * FROM board';  
        conn.query(sql,function(err,rows,fields){
                if(err){
                        console.log('err :' + err);
                }
                else{
                        var commentText = req.body.commentText;                       
                        var sql = 'INSERT INTO board(text) VALUES(?)';                                                           
                        conn.query(sql,commentText, function (err, rows, fields) {
               if (err) {
                        console.log('err :' + err);
               } else {
                        console.log(rows);
                        console.log("들어감"); 
                        // return res.send("<script>alert('등록'); window.location=/show</script>");
               }
               })

                        var data="<html><head><title>mysql test</title></head>"  
                        data+="<h1>댓글 보기</h1>" 
                        data+="<table border=\"1\">"    
                        data+="<tr> <th>번호</th> <th>날짜</th> <th>댓글</th> <th>삭제</th> </tr> "  
                        
                        for (var i in rows){  
                        data += "<tr>"  
                        data += "<td>"+rows[i].num +"</td>" 
                        data += "<td>"+rows[i].date +"</td>"  
                        data += "<td>"+rows[i].text +"</td>" 
                        data += `<td> <form action="/remove" method="post">
                        <input type="submit" value="삭제">
                        </form> </td>`
                        data += "</tr>"  
                        }  
                        
                        data+="</table></html>" 
                        res.send(data)
                }

                
        })
})



// app.post('/remove',function(req,res){
//         var sql = 'DELETE FROM board WHERE ';  
//         conn.query(sql,function(err,rows,fields){
//                 if(err){
//                         console.log('err :' + err);
//                 }
//                 else {
//                         console.log(rows);
//                         console.log("삭제됨"); 
//                         // return res.send("<script>alert('등록'); window.location=/show</script>");
//                }
        
// })
               
// })



app.get('/join', function(req, res){                           
        res.render('join');
});

app.get('/index', function(req, res){                           
        res.render('index');
});

app.get('/login', function(req, res){
        res.render('login');
})

app.get('/board', function(req, res){
        res.render('board');
})

app.get('/add', function(req, res){
        res.render('add');
})



app.listen(3000, function(){
        console.log('connected 3000 port!');
});