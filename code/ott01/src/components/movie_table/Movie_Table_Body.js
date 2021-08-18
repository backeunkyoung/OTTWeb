import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

function Movie_Table_Body(props) {
    const [movies, setMovies] = useState();

    let keyword = props.keyword // Search_Form의 input 값
    //console.log("keyword : " + keyword);

    function search_result(keyword) { // server에게 영화DB 받아오기
        var url = "/search_result";

        axios.post( url, {
            postKeyword : keyword
        })  // 성공시 then 진행
        .then(function (res) {
            console.log("keyword : " + keyword);
            setMovies(res.data.data);
            //console.log("res : " + JSON.stringify(res.data.data));
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
            setMovies("error");
        })
    }

    useEffect(() => {   // 컴포넌트가 렌더링 될 때마다 특정 작업 실행
        search_result(keyword);
    }, [keyword]);  // keyword가 바뀔 때 실행

    const [genresList, setGenresList] = useState({   // 장르 목록
        content_id: '',
        genre_name: '',
    });

    const [countrysList, setCountrysList] = useState({   // 국가 목록
        content_id: '',
        country_name: '',
    });

    const [actorsList, setActorsList] = useState({   // 출연 배우 목록
        content_id: '',
        actor_name: '',
    });

    useEffect(() => {
        function get_genre_name() { // server에게 장르 이름 리스트 받아오기
            var url = "/get_genre_name";
    
            axios.post( url, {
            })  // 성공시 then 진행
            .then(function (res) {
                // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
                setGenresList(res.data);
            })  // 실패시 catch 진행
            .catch(function (error) {
                alert("error발생 => " + error);
                setGenresList("error");
            })
        }
        get_genre_name();

        function get_country_name() { // server에게 국가 이름 리스트 받아오기
            var url = "/get_country_name";
    
            axios.post( url, {
            })  // 성공시 then 진행
            .then(function (res) {
                // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
                setCountrysList(res.data);
            })  // 실패시 catch 진행
            .catch(function (error) {
                alert("error발생 => " + error);
                setCountrysList("error");
            })
        }
        get_country_name();

        function get_actor_name() { // server에게 출연 배우 이름 리스트 받아오기
            var url = "/get_actor_name";
    
            axios.post( url, {
            })  // 성공시 then 진행
            .then(function (res) {
                // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
                setActorsList(res.data);
            })  // 실패시 catch 진행
            .catch(function (error) {
                alert("error발생 => " + error);
                setActorsList("error");
            })
        }
        get_actor_name();
    
    }, [])  // 대괄호 비워 둠 => 컴포넌트가 처음 나타날때만 실행

    var tableBody = []; // TableBody에 넣을 데이터

    function outputGenre(id) {
        var result = '';

        if (genresList) {
            var size = genresList.data.length;

            for (let i = 0; i < size; i++) {
                if (genresList.data[i].content_id === id) {
                    result += genresList.data[i].attribute_name + ", ";
                }
            }

            return result;
        }
    }

    function outputCountry(id) {
        var result = '';

        if (countrysList) {
            var size = countrysList.data.length;

            for (let i = 0; i < size; i++) {
                if (countrysList.data[i].content_id === id) {
                    result += countrysList.data[i].country_name + ", ";
                }
            }

            return result;
        }
    }

    function outputActor(id) {
        var result = '';
        
        if (actorsList.data) {
            var size = actorsList.data.length;

            for (let i = 0; i < size; i++) {
                if (actorsList.data[i].content_id === id) {
                    result += actorsList.data[i].Name + ", ";
                }
            }

            return result;
        }
    }

    const check_undefined = _.get(props, "movies");

    // check_undefined && check_undefined.map(movie =>
    movies && movies.map(movie =>
        tableBody.push(
            {
                id: movie.content_id,
                poster: movie.poster,
                title: movie.title,
                date: movie.screening_date,
                director: movie.director,
                age: movie.age_information,
                genre: outputGenre(movie.content_id),
                country: outputCountry(movie.content_id),
                actor: outputActor(movie.content_id),
                summary: movie.summary,
            },
        )
    )

    return(
        <div>
            <React.Fragment>
                {tableBody && tableBody.map(movie =>
                    <tr key={movie.content_id}>
                        <td><img src = {movie.poster} width="150" height="250"></img></td>   {/* poster */}
                        <td>{movie.title}</td> 
                        <td>{movie.date}</td>
                        <td>{movie.director}</td>
                        <td>{movie.age}</td>
                        <td>{movie.genre}</td>
                        <td>{movie.country}</td>
                        <td>{movie.actor}</td>
                        <td>{movie.summary}</td>
                    </tr>
                )}
            </React.Fragment>
        </div>
    )
}
export default Movie_Table_Body;