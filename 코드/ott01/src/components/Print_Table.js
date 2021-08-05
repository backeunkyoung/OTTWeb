import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

function Print_Table() {

    function get_movies () { // server에게 영화DB 받아오기
        var url = "/movieTable";
    
        axios.post( url, {
        })  // 성공시 then 진행
        .then(function (res) {
            // 여기서 받아온 res는 JSON 타입
            // console.log("get_movies함수 실행\n" + JSON.stringify(res.data));
            // console.log("추출(첫번째 요소) : \n" + JSON.stringify(res.data.data[0]));
            console.log("get_movies 함수 실행됨");
    
            return res.data;
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
            return "error";
        })
    }

    useEffect(() => {
        let movies = get_movies();
    },[]);
    
    console.log("movies : " + movies);

    return(
        <div>
            <h1>테이블 리턴</h1>
            movies :  {JSON.stringify(movies)}
        </div>
    )
}

export default Print_Table;