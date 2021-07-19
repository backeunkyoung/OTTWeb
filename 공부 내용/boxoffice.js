var express    =  require("express");  
var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : 'root',  
  database : 'test'  
});  
var app = express();  
  
connection.connect(function(err){  
if(!err) {  
    console.log("Database is connected ... \n\n");    
} else {  
    console.log("Error connecting database ... \n\n");    
}  
});  
  
app.get("/",function(request,response){  
connection.query('SELECT * from boxoffice ORDER BY rnum*1', function(err, rows, fields) {  
connection.end();  
  if (!err){  
       var data="<html><head><title>mysql test</title></head>"  
       data+="<h1>주간 박스오피스</h1>"  
       data+="<table border=\"1\">"    
       data+="<tr> <th>순위</th> <th>개봉일</th>  <th>영화제목</th> </tr>"  
  
for (var i in rows){  
    data += "<tr>"  

    data += "<td>"+rows[i].rank +"</td>"  
    data += "<td>"+rows[i].openDt+"</td>";  
    data += "<td>"+rows[i].movieNm+"</td>";  


    data += "</tr>"  
}  
  
data+="</table></html>"  
  
response.send(data);  
  }  
  else  
    console.log('Error while performing Query.');  
  });  
});  
  
app.listen(9998);  