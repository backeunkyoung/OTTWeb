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
connection.query('SELECT * from movie', function(err, rows, fields) {  
connection.end();  
  if (!err){  
       var data="<html><head><title>mysql test</title></head>"  
       data+="<h1>영화목록</h1>"  
       data+="<table border=\"1\">"    
       data+="<tr> <th>movieCd</th> <th>movieNm</th>  <th>openDt</th> <th>typeNm</th> <th>genreAlt</th>  <th>nationAlt</th> </tr>"  
  
for (var i in rows){  
    data += "<tr>"  

    data += "<td>"+rows[i].movieCd +"</td>"  
    data += "<td>"+rows[i].movieNm+"</td>";  
    data += "<td>"+rows[i].openDt+"</td>";  
    data += "<td>"+rows[i].typeNm+"</td>";  
    data += "<td>"+rows[i].genreAlt+"</td>";  
    data += "<td>"+rows[i].nationAlt+"</td>";  

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