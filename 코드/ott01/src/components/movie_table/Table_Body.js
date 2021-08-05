import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';

function Table_Body() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => { // server에게 영화DB 받아오기
        setLoading(true);

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
    },[]);

    if (loading) {
        return <Loader type="spin" color="gray" message={"로딩중"}></Loader>
    }
    console.log("movies : " + movies);

    return(
        <div>
            <React.Fragment>
                {movies && movies.data.map(movie =>
                    <tr key={movie.content_id}>
                        <td>{movie.poster}</td>   {/* poster */}
                        <td>{movie.title}</td>   {/* title */}
                        <td>{movie.director}</td>   {/* director */}
                        <td>{movie.age_information}</td>   {/* age_information */}
                        <td>{movie.summary}</td>   {/* summary */}
                    </tr>
                )}
            </React.Fragment>
        </div>
    )
}
export default Table_Body;