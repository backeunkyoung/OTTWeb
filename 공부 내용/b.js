var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');           

var conn = mysql.createConnection({
        host    :       '18.188.140.138',
        user    :       'user01',
        password:       'dkapflzksh0405',
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



    app.post('/show', function(req, res){         

        var data;
        var id = req.body.ID;
        var movie_title = req.body.movie_title;     
        var commentText = req.body.commentText;          
        
        var sql = 'INSERT INTO board(id, movie, text) VALUES(?, ?, ?)';
        var params = [id, movie_title, commentText];   
        conn.query(sql,params,function(err,rows,fields){
                if(err){
                        console.log('err :' + err);
                }
                else{
                    var sql2 = 'SELECT * FROM board';
                    conn.query(sql2,function(err,rows,fields){
                            if(err){
                                    console.log('err : ' + err);
                            }
                            else{
                                data="<!DOCTYPE html><html><head><title>mysql users</title></head>"                           
                                data+="<table border=\"1\"> <form method='post' action='delete'>"    
                                data+="<tr> <th>아이디</th> <th>영화 제목</th>  <th>댓글</th> <th>날짜</th> <th>삭제</th></tr> "          
                                        for (var z in rows){
                                                data += "<tr>"  
                                                data += "<td>"+rows[z].id +"</td>"  
                                                data += "<td>"+rows[z].movie+"</td>";
                                                movie = rows[z].movie;
                                                data += "<td>"+rows[z].text+"</td>";  
                                                data += "<td>"+rows[z].date+"</td>"; 
                                                data += "<td><input type='checkbox' name= value=></td>"
                                        }       
                                data += "</tr>"; 
                                data+="</table> <input type='submit' value='입력완료'> </form> </html>";
                                res.send(data);
                }  
                        
                    })
                }
          
    
    });
})

app.post('/delete', function(req, res){         

        var data;
        var movie = req.body.movie;         
        console.log(movie);
        var sql = "DELETE FROM board WHERE movie = ?";  
        conn.query(sql,movie,function(err,rows,fields){
                if(err){
                        console.log('err :' + err);
                }
                else{
                    var sql2 = 'SELECT * FROM board';
                    conn.query(sql2,function(err,rows,fields){
                            if(err){
                                    console.log('err : ' + err);
                            }
                            else{
                                data="<!DOCTYPE html><html><head><title>mysql users</title></head>"                           
                                data+="<table border=\"1\"> <form method='post' action='delete'>"    
                                data+="<tr> <th>아이디</th> <th>영화 제목</th>  <th>댓글</th> <th>날짜</th></tr> "          
                                        for (var z in rows){
                                                data += "<tr>"  
                                                data += "<td>"+rows[z].id +"</td>"  
                                                data += "<td>"+rows[z].movie+"</td>"; 
                                                data += "<td>"+rows[z].text+"</td>";  
                                                data += "<td>"+rows[z].date+"</td>"; 
                                        }       
                                data += "</tr>"; 
                                data+="</table></form> </html>";
                                res.send(data);
                }  
                        
                    })
                }
          
    
    });
})



app.get('/join', function(req, res){                           
        res.render('join');
});

app.get('/index', function(req, res){                           
        res.render('index');
});

app.get('/login', function(req, res){
        res.render('login');
})

app.get('/tag', function(req, res){
        res.render('tag');
})

app.get('/board', function(req, res){
        res.render('board');
})




app.listen(3000, function(){
        console.log('connected 3000 port!');
}); 