import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

function MovieTableBody(props) {
    console.log("props : " + JSON.stringify(props))

    let genreIdNameList = []  // 전체 장르 리스트(content_id, genre_name)

    const [movieTable, setMovieTable] = useState([])    // 테이블로 표현할 데이터
    let allMovies = []; // 모든 영화
    
    function searchResult() { // server에게 영화DB 받아오기

        let keyword = props.keyword;
        let keywordMovieList = [];

        var url = "/search_result";

        axios.post( url, {
            postKeyword : keyword
        })  // 성공시 then 진행
        .then(function (res) {
            keywordMovieList = res.data.data
            allMovies = keywordMovieList;
            movieFilter();
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    }

    function movieFilter() {

        let selectGenre = _.map(props.genre, "genreId");
        let selectGenreLen = selectGenre.length;
        
        let newMovies = [];

        allMovies && allMovies.map((movie) => {
            //[1,2,3]
            let movieGenre = movie.genres.split(",");

            //let match = selectGenre.every(val => movieGenre.includes(val));

            let match = true;
            for ( let i =0 ; i< selectGenreLen; i++) {
                match = movieGenre.includes(""+selectGenre[i]);

                if (!match) break; 
            }

            if (match) {
                newMovies.push(movie);
            }
        });

        MovieTable(newMovies);
    }
    
    useEffect(() => {
        searchResult(); // input창에 따른 영화 리스트 받아오기
    }, [props])


    useEffect(() => {

        // server에게 영화 ID - 장르 이름 리스트 받아오기(content_id, attribute_name)
        var genreListUrl = "/get_genre_name";

        axios.post( genreListUrl, {
        })  // 성공시 then 진행
        .then(function (res) {
            genreIdNameList = res.data.data;
            // console.log("받은 장르 이름 리스트 : \n" + JSON.stringify(genreIdNameList));
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })

        // // server에게 국가 이름 리스트 받아오기
        // var countryLIstUrl = "/get_country_name";

        // axios.post( countryLIstUrl, {
        // })  // 성공시 then 진행
        // .then(function (res) {
        //     // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
        //     setCountrysList(res.data);
        // })  // 실패시 catch 진행
        // .catch(function (error) {
        //     alert("error발생 => " + error);
        //     setCountrysList("error");
        // })

        // // server에게 출연 배우 이름 리스트 받아오기
        // var actorListUrl = "/get_actor_name";

        // axios.post( actorListUrl, {
        // })  // 성공시 then 진행
        // .then(function (res) {
        //     // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
        //     setActorsList(res.data);
        // })  // 실패시 catch 진행
        // .catch(function (error) {
        //     alert("error발생 => " + error);
        //     setActorsList("error");
        // })
    
    }, [])  // 대괄호 비워 둠 => 컴포넌트가 처음 나타날때만 실행

    const [countrysList, setCountrysList] = useState({   // 국가 목록
        content_id: '',
        country_name: '',
    });

    const [actorsList, setActorsList] = useState({   // 출연 배우 목록
        content_id: '',
        actor_name: '',
    });

    function outputGenre(id) {  // 장르 id코드를 한글로 변환
        var result = '';

        genreIdNameList && genreIdNameList.map((genre) => {
            if (genre.content_id === id) {
                
                console.log("해당 ID : " + id + " ,해당 장르 : " + genre.attribute_name);
                
                result += genre.attribute_name + ", ";
            }
        })
        console.log("---")

        console.log("result : " + result)
        return result;
    }

    function outputCountry(id) {    // 국가 id코드를 한글로 변환
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

    function outputActor(id) {  // 배우 id코드를 한글로 변환
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

    function MovieTable(getMovie) { // 출력할 영화 목록 셋팅
        // console.log("셋팅할 Movies : \n" + JSON.stringify(getMovie));
        let pushMovie = [];
        
        getMovie && getMovie.map(movie => {
            pushMovie.push(
                {
                    id: movie.content_id,
                    poster: movie.poster,
                    title: movie.title,
                    date: movie.screening_date,
                    director: movie.director,
                    age: movie.age_information,
                    genre: outputGenre(movie.content_id),
                    // country: outputCountry(movie.content_id),
                    // actor: outputActor(movie.content_id),
                    summary: movie.summary,
                },
            )
        })

        setMovieTable(pushMovie);
        console.log("출력할 Movies : \n" + JSON.stringify(movieTable));
    }

    return(
        <div>
            <React.Fragment>
                {movieTable && movieTable.map(movie =>
                    <tr key={movie.content_id}>
                        <td><img src = {movie.poster} width="150" height="250"></img></td>   {/* poster */}
                        <td>{movie.title}</td> 
                        <td>{movie.date}</td>
                        <td>{movie.director}</td>
                        <td>{movie.age}</td>
                        <td>{movie.genre}</td>
                        {/* <td>{movie.country}</td> */}
                        {/* <td>{movie.actor}</td> */}
                        <td>{movie.summary}</td>
                    </tr>
                )}
            </React.Fragment>
        </div>
    )
}
export default MovieTableBody;