import React, { useEffect } from "react";
import axios from 'axios';

// server 호출
function Movie_Table() {

    const movie_data = () => {
        alert("클릭 이벤트");
        var url = "/movieTable";

        axios.post( url, {
        })  // 성공시 then 진행
        .then(function (response) {
            // 여기서 받아온 response는 JSON 타입
            console.log(JSON.stringify(response));
            alert("response.data : " + response.data);
            return response.data;
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    
    }


    return (
        <div>
            <button type='button' onClick={movie_data}>버튼</button>
            
            영화 목록..
        </div>
    )
}

export default Movie_Table