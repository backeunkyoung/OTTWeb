const express = require('express');
const session = require('express-session');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const fileStore = require('session-file-store')(session);
const app = express();


var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : 'root',  
  database : 'test'  
});  

  
connection.connect(function(err){  
if(!err) {  
    console.log("Database is connected ... \n\n");    
} else {  
    console.log("Error connecting database ... \n\n");    
}  
});  

app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'secret key',
     resave: false,
    saveUninitialized: false,
    store : new fileStore()
  }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(req,user, done) { 
    done(null, user);
});

//메인 페이지
app.get('/',(req,res)=>{
    let page = getPage('메인','메인 페이지',authInfo(req));
    res.send(page);
});

//로그인
app.get('/login',(req,res)=>{
    let page =  getPage('로그인',`
    <form action="/login" method="post">
    <fieldset>
        아이디 : <input type="text" name="user_id" placeholder="아이디"><br>
        비밀번호 : <input type="password" name="user_pw" placeholder="비밀번호"><br>
        <div>
        <p>
            <input type="submit" value="로그인">
            <a href="/join">회원가입</a>
        </div>
        </fieldset>
    </form>
    `,`<a href="/">뒤로가기</a>`);
    res.send(page);
});


app.post('/login',(req,res)=>{
    var id = req.body.user_id;
    var pw = req.body.user_pw;
    var name = req.body.name;
    
    connection.query('SELECT * from member', function(err, rows, fields) {  
    if (!err){
        for (var i in rows){  
            if(id == rows[i].id){
                if(pw == rows[i].pw){
                return res.send("<script>alert('로그인 성공'); window.location=\"/app\"</script>");
                }
            } 
        } 
    } 
        
        return res.send("<script>alert('로그인 실패'); window.location=\"/login\"</script>");
 
        });  

});



app.get('/app',(req,res)=>{
    let page =  getPage('페이지',`
    <form action="/app_check" method="post">
 
    </form>
    `,`<a href="/">뒤로가기</a>`);
    res.send(page);
});


app.post('/join',(req,res)=>{
    var id = req.body.user_id;
    var pw = req.body.password;
    var name = req.body.name;
    //DB에 insert
    

    connection.query('SELECT * from member', function(err, rows, fields) {  
          if (!err){    
          
        for (var i in rows){  
            if(id == rows[i].id){
                return res.send("<script>alert('등록된 아이디입니다.'); window.location=\"/login\"</script>");
               // return res.redirect('/login');
            } 
        }  
        
        var sql = {id : id, pw : pw, name : name};
        var query = connection.query('insert into member set ?', sql, function(err, rows){
        if(err) {throw err;}
        console.log("ok db insert");
        })
        res.redirect('/login');
          }   
        });  

});




// app.post('/app_check',(req,res)=>{
//     let s = req.body.sub;
//     let t = req.body.time;
//     res.send("과목 : " + s + "<p>"+ " 시간 : " + t);
// });




app.post('/login',
passport.authenticate('local', { successRedirect: '/app', failureRedirect: '/login'}));





//회원가입
app.get('/join',(req,res)=>{
    let page = getPage('회원가입',`
    <form action="/join" method="post">
    <fieldset>
        아이디 : <input type="user_id" name="user_id"><br>
        비밀번호 : <input type="password" name="password"><br>
        이름 : <input type="name" name="name"><br>
        <p>
        <input type="submit" value="회원가입"><br>
        </fieldset>
    </form>
    `,'<a href="/login">뒤로가기</a>');
    res.send(page);
});



app.post('/join',(req,res)=>{
    var id = req.body.user_id;
    var pw = req.body.password;
    var name = req.body.name;
    //DB에 insert
    

    connection.query('SELECT * from member', function(err, rows, fields) {  
          if (!err){    
          
        for (var i in rows){  
            if(id == rows[i].id){
                return res.send("<script>alert('등록된 아이디입니다.'); window.location=\"/login\"</script>");
               // return res.redirect('/login');
            } 
        }  
        
        var sql = {id : id, pw : pw, name : name};
        var query = connection.query('insert into member set ?', sql, function(err, rows){
        if(err) {throw err;}
        console.log("ok db insert");
        })
        res.redirect('/login');
          }   
        });  

});

//로그 아웃
app.get('/logout',(req,res)=>{
    req.logout();
    req.session.destroy(()=>{
        res.cookie('connect.sid','',{maxAge:0});
        res.redirect('/');
    });
});


app.listen(3000,()=>console.log(`http://localhost:3000`));

const authInfo = (req)=>{
    if(req.user) return `${user.name} <p> <a href="/logout">로그아웃</a>`;
    return `<a href="/login">login</a>`;
}

const getPage = (title, content, Info) =>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">

        <title>메인</title>
    </head>
    <body>
    ${Info}
        <h1>${title}</h1>
        <p>${content}</p>
    </body>
    </html>`;
}