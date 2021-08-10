import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Table_Body() {
    const [movies, setMovies] = useState();

    useEffect(() => {
        
        function get_movies() { // server에게 영화DB 받아오기
            var url = "/movieTable";
    
            axios.post( url, {
            })  // 성공시 then 진행
            .then(function (res) {
                // 여기서 받아온 res는 JSON 타입
                // console.log("get_movies함수 실행\n" + JSON.stringify(res.data));
                // console.log("추출(첫번째 요소) : \n" + JSON.stringify(res.data.data[0].title));
                console.log("get_movies 함수 실행됨");

                setMovies(res.data);
            })  // 실패시 catch 진행
            .catch(function (error) {
                alert("error발생 => " + error);
                setMovies("error");
            })
        }
        get_movies();

    },[]);


    return(
        <div>
            <React.Fragment>
                {/* React는 렌더링이 화면에 커밋 된 후에 모든 효과를 실행 함*/}
                {/* 즉, return에서 map을 반복 실행 할 때, movies에 첫 데이터가 아직 안들어와도 렌더링이 실행 된다. => undefined 오류 발생 */}
                {/* 따라서 movies && 조건을 추가 해 movies에 값이 있으면(true) 실행되도록 한다 */}
                {movies && movies.data.map(movie =>
                    <tr key={movie.content_id}>
                        <td><img src = {movie.poster} width="150" height="250"></img></td>   {/* poster */}
                        <td>{movie.title}</td>   {/* title */}
                        <td>{movie.screening_date}</td>   {/* screening_date */}
                        <td>{movie.director}</td>   {/* director */}
                        <td>{movie.attribute_genre}</td>   {/* attribute_genre */}
                        <td>{movie.production_country}</td>   {/* production_country */}
                        <td>{movie.age_information}</td>   {/* age_information */}
                        <td>{movie.summary}</td>   {/* summary */}
                    </tr>
                )}
            </React.Fragment>
            
        </div>
    )
}
export default Table_Body;