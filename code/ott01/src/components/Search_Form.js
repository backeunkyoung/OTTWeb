import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie_Table_Body from './movie_table/Movie_Table_Body';

function Search_Form() {
    const [keyword, setKeyword] = useState('');

    function search_result(keyword) { // server에게 영화DB 받아오기
        var url = "/search_result";

        axios.post( url, {
            postKeyword : keyword
        })  // 성공시 then 진행
        .then(function (res) {
            console.log("keyword : " + keyword);
            console.log("받은 결과 : \n" + JSON.stringify(res.data));
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    }

    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    useEffect(() => {   // 컴포넌트가 렌더링 될 때마다 특정 작업 실행
        search_result(keyword);
    }, [keyword]);  // keyword가 바뀔 때 실행

    return(
        <div>
            <input
                type="text"
                name="keyword"
                placeholder="제목, 배우, 감독 등 검색"
                value={keyword}
                onChange={onChange}
            ></input>
        </div>
    )
}
export default Search_Form;