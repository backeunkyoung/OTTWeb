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
                                       return res.send("<script>alert('로그인 성공'); window.location=\"/platform\"</script>");
                               }
                       } else {
                               console.log(rows[0]);
                               return res.send("<script>alert('등록되지 않은 아이디입니다.'); window.location=\"/login\"</script>");
                               //res.redirect('/');
                       }
               }
               })
});

////// 검색한 단어가 포함된 영화의 플랫폼 찾기

      //검색 띄어쓰기 상관없이 결과 나옴
      app.post('/search_form', function(req, res){ 
        var k=0;        
        var search = req.body.search;
        var s = search.replace(/ /g,"")    
        var sql = "SELECT content_id,title FROM contents WHERE REPLACE(title,' ','') LIKE ?" // 제목으로 검색하고 content_id를 받아옴
        var data;
        conn.query(sql,["%"+s+"%"],function(err,rows,fields){
                if(err){
                        console.log('err : ' + err);
                }
                else{   
                    data="<!DOCTYPE html><html><head><title>mysql users</title></head>"
                    data+="<h3>검색 내용 : "+search+"</h3>"
                    var Users = [];
                    for(var i in rows){            
                    Users.push({arr : rows[i].content_id , movie : rows[i].title});
                    }   

                //console.log(Users);
                // console.log("데이터 갯수" + Users.length);

                    for(var x in rows){
                        var sql2 = "SELECT * FROM content_platform WHERE content_pid = ?";
                        conn.query(sql2,[Users[x].arr], function(err,rows,fields){                                        
                                if(err){
                                        console.log('err : ' + err);
                                }
                                else{
                                    data+="<h3> 영화 제목 : "+ Users[k].movie+"</h3>"; 
                                    data+="<table border=\"1\">"    
                                    data+="<tr> <th>content_id</th> <th>플랫폼</th> </tr> " 
                                        for (var z in rows){
                                                data += "<tr>"  
                                                data += "<td>"+rows[z].content_pid +"</td>" 
                                                data += "<td>"+rows[z].platform+"</td>";  
                                        }
                                        data += "</tr>"; 
                                        data +="</table>"; 
                                        if(k == (Users.length-1)){
                                                data+="</html>"
                                                res.send(data);
                                            }
                                    }   
                                    k++;
                        })

                }   
            }

        })
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

app.get('/search', function(req, res){
        res.render('search');
})

app.get('/platform', function(req, res){
    res.render('platform');
})




app.listen(3000, function(){
        console.log('connected 3000 port!');
}); 