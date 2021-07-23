var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');           

var conn = mysql.createConnection({
        host    :       '127.0.0.1',
        user    :       'root',
        password:       'root',
        database:       'test'
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/Public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res){
                res.render('join');
});

app.post('/receive', function(req, res){
                var ID = req.body.user_Id;
                var PW1 = req.body.user_pw1;
                var PW2 = req.body.user_pw2;               
                var NICK = req.body.user_nick;
                var AGE = req.body.user_age;

                if(PW1 === PW2){                   

                        conn.query('SELECT * from test', function(err, rows, fields) {  
                         if (!err){     
                              for (var i in rows){  
                                  if(ID == rows[i].ID){
                                      return res.send("<script>alert('등록된 아이디입니다.'); window.location=\"/\"</script>");
                                     // return res.redirect('/login');
                                  } 
                        }  
             


                 bcrypt.hash(PW1, null, null, function(err, hash){  
                  var sql = 'INSERT INTO test(ID, PW, NICK, AGE) VALUES(?, ?, ?, ?)';
                  var params = [ID, hash, NICK, AGE];   
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
        var loginID = req.body.login_id;               
        var loginPW = req.body.login_pw;                       
        var loginsql = 'SELECT * FROM test WHERE ID = ?';  
                                                                 
        conn.query(loginsql, loginID, function (err, rows, fields) {
               if (err) {
                        console.log('err :' + err);
               } else {
                       console.log(rows);
                       if (rows[0]!=undefined) {
                               if (!bcrypt.compareSync(loginPW, rows[0].PW)) {     
                                       return res.send("<script>alert('비밀번호가 일치하지 않습니다.'); window.location=\"/login\"</script>");
                               } else {
                                       return res.send("<script>alert('로그인 성공'); window.location=\"/suc_login\"</script>");
                               }
                       } else {
                               console.log(rows[0]);
                               return res.send("<script>alert('등록되지 않은 아이디입니다.'); window.location=\"/login\"</script>");
                               res.redirect('/');
                       }
               }
               })
       });



app.get('/join', function(req, res){                           
        res.render('join');
});

app.get('/index', function(req, res){                           
        res.render('index');
});

app.get('/login', function(req, res){
        res.render('login');
})

app.get('/suc_login', function(req, res){
        res.render('suc_login');
})

app.listen(3000, function(){
        console.log('connected 3000 port!');
});