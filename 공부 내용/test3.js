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
                                       return res.send("<script>alert('로그인 성공'); window.location=\"/search\"</script>");
                               }
                       } else {
                               console.log(rows[0]);
                               return res.send("<script>alert('등록되지 않은 아이디입니다.'); window.location=\"/login\"</script>");
                               //res.redirect('/');
                       }
               }
               })
       });


       //검색 띄어쓰기 상관없이 결과 나옴
       app.post('/search_form', function(req, res){         
        var search = req.body.search;   
        var s = search.replace(/ /g,"")  
        var list;
       // var sql = "SELECT * FROM contents WHERE REPLACE(title,' ','') LIKE ?"; //제목으로 검색
        var sql = "SELECT filmo FROM person WHERE REPLACE(name,' ','') LIKE ?" // 출연배우로 검색하고 그 배우의 필모 번호를 받아옴
      conn.query(sql,s,function(err,rows,fields){       
              for (var i in rows){
                      var arr = rows[i].filmo;
                        list = arr.split(',');        
              
        console.log(list);
        for(var x=0; x<list.length; x++){
           var sql2 = "SELECT * FROM contents WHERE content_id ="+ list[x]; 
        if(!sql2)  {
             continue; 
        } 
        
  
               // var sql2 = "SELECT * FROM contents WHERE content_id IN (?)";
        //var sql2 = "SELECT * FROM contents JOIN person ON contents.content_id = person.filmo WHERE REPLACE(name,' ','') LIKE ?"; //출연배우로 검색
        //var sql3 = "SELECT * FROM contents WHERE REPLACE(director,' ','') LIKE ?"; //영화감독으로 검색["%"+s+"%"] 
        conn.query(sql2,list[x], function(err, rows, fields){
                if (err) {
                        console.log('err :' + err);
               } 
                else
                {
                var data="<html><head><title>mysql users</title></head>"  
                        data+="<h1>보기</h1>" 
                        data+="<table border=\"1\">"    
                        data+="<tr> <th>content_id</th> <th>title</th>  <th>summary</th> <th>production_country</th> <th>attribute_genre</th>  <th>screening_date</th> <th>age_information</th> <th>director</th></tr> "  
                        for (var i in rows){  
                        data += "<tr>"  
                        data += "<td>"+rows[i].content_id +"</td>"  
                        data += "<td>"+rows[i].title+"</td>";  
                        data += "<td>"+rows[i].summary+"</td>";  
                        data += "<td>"+rows[i].production_country+"</td>";  
                        data += "<td>"+rows[i].attribute_genre+"</td>";  
                        data += "<td>"+rows[i].screening_date+"</td>";  
                        data += "<td>"+rows[i].age_information+"</td>";
                        data += "<td>"+rows[i].director+"</td>"; 
                }
                data += "</tr>"  
                data+="</table></html>" 
                res.send(data) 
                }
     
           })
        }}
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

app.get('/search', function(req, res){
        res.render('search');
})





app.listen(3000, function(){
        console.log('connected 3000 port!');
});