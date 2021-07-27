var express    =  require("express");  
var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : '18.188.140.138',  
  user     : 'user01',  
  password : '1111',  
  database : 'movies_db'  
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
connection.query('SELECT * from contents', function(err, rows, fields) {  
connection.end();  
  if (!err){  
       var data="<html><head><title>mysql test</title></head>"  
       data+="<h1>영화목록</h1>"  
       data+="<table border=\"1\">"    
       data+="<tr> <th>content_id</th> <th>title</th>  <th>summary</th> <th>production_country</th> <th>field_genre</th>  <th>screening_date</th> <th>age_imformation</th>  <th>director</th> </tr>"  
  
for (var i in rows){  
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
  
app.listen(9998);  