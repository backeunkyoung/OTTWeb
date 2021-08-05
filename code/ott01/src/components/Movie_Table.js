import React, { useEffect } from "react";
import axios from 'axios';
import Table from "./Print_Table";

// server 호출
function Movie_Table() {

    const movie_data = () => {
        alert("클릭 이벤트");
        var url = "/movieTable";

        axios.post( url, {
        })  // 성공시 then 진행
        .then(function (res) {
            // 여기서 받아온 res는 JSON 타입
            // console.log(JSON.stringify(res.data));

            var movie_contents = res.data;

            var data="<html><head><title>mysql test</title></head>"  
            data += "<h1>영화목록</h1>"  
            data += "<table border=\"1\">"    
            data += "<tr> <th>content_id</th> <th>title</th>  <th>summary</th> <th>production_country</th> <th>field_genre</th>  <th>screening_date</th> <th>age_imformation</th>  <th>director</th> </tr>"  

            for(var i = 0; i < movie_contents.length; i++) {
                data += "<tr>"  
                data += "<td>"+movie_contents[i].content_id +"</td>"  
                data += "<td>"+movie_contents[i].title+"</td>";  
                data += "<td>"+movie_contents[i].summary+"</td>";  
                data += "<td>"+movie_contents[i].production_country+"</td>";  
                data += "<td>"+movie_contents[i].field_genre+"</td>";  
                data += "<td>"+movie_contents[i].screening_date+"</td>";  
                data += "<td>"+movie_contents[i].age_imformation+"</td>";
                data += "<td>"+movie_contents[i].director+"</td>";
                data += "</tr>"  
            }

            data+="</table></html>"

            console.log("data : \n" + data);
            return res.data;
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    
    }


    return (
        <div>
            <button type='button' onClick={movie_data}>버튼</button>
            
            영화 목록..
            <Table></Table>
        </div>
    )
}

export default Movie_Table