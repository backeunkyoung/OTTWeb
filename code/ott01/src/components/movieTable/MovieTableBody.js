import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { CarouselControl } from 'reactstrap';
import MovieTable from './MovieTable';

function MovieTableBody(props) {
    console.log("props : " + JSON.stringify(props))

    let contentGenreList = []   // 영화, 장르 연결 리스트(content_pid, attribute_num)
    let genreList = []  // 전체 장르 리스트(content_id, genre_name)

    let movieTable = [];

    function getData() {    // 영화, 장르 연결 리스트 + 전체 장르 리스트 받아오기
        // 영화, 장르 연결 리스트(content_pid, attribute_num) 받아오기
        var contentGenreListUrl = "/get_content_connect_genre";
        axios.post( contentGenreListUrl, {
        })  // 성공시 then 진행
        .then(function (res) {

            let resList = res.data.data;

            resList && resList.map((element) => {
                contentGenreList.push({
                    content_id: element.content_pid,
                    genre_num: element.attribute_num,
                })
            })
            console.log("contentGenreList 완료");
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })

        // 전체 장르 리스트(content_id, genre_name) 받아오기
        var genreListUrl = "/get_genre_name";
        axios.post( genreListUrl, {
        })  // 성공시 then 진행
        .then(function (res) {
            let resList = res.data.data;

            resList && resList.map((element) => {
                genreList.push({
                    content_id: element.content_id,
                    genre_name: element.attribute_name,
                })
            })
            console.log("genreList 완료");
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    }

    function genreFilter(movieList, genre) { // 장르 버튼에 따른 필터 결과값 받아오기(content_pid로 저장)
        //let genreCount = Object(genre).length;
        let movieCount = Object(movieList).length;

        console.log("영화 개수 : " + movieCount);

        MovieTable(movieList);

        // movieList && movieList.map((movie) => {
        //     //console.log("movie ID : " + movie.content_id)

        //     if (genreCount == 0) {
        //         genre
        //     }
        // })

        // console.log("장르 : " + JSON.stringify(genre))

        // console.log("contentGenreList : " + JSON.stringify(contentGenreList));
        // console.log("genreList : " + JSON.stringify(genreList))

        // contentGenreList && contentGenreList.map((connect) => {
        //     movieList && movieList.map((content) => {
        //         if (connect.content_id === content.content_id) {
        //             console.log("같은 id : " + content.content_id)
        //         }
        //     })
        // })

        // genresList && genresList.map((element) => {
        //     console.log("장르 목록 보기 : " + JSON.stringify(element));
        // })


        // 해당되는 장르의 ID값을 넘김
        //     let once = true;

        //     while(repetitionCount !== 0) {
        //         var url = "/genre_filter";
    
        //         axios.post( url, {
        //             postFirstGenre : genres[repetitionCount-1].genreId
        //         })  // 성공시 then 진행
        //         .then(function (res) {
        //             console.log("\n현재 장르 : " + JSON.stringify(res.data.genreNum));
                
        //             let nowData = res.data.data
        //             console.log("nowData : " + JSON.stringify(nowData));
    
        //             if (once && nowData && Object(outputMovies).length === 0) {    // 1번만 초기화
        //                 outputMovies = nowData;
        //                 once = false;
        //             }
                    
        //             let overlapData = []    // 겹치는 값만 저장할 배열
                    
        //             outputMovies && outputMovies.map(element => {   // 비교하면서 겹치는 ID값만 push하기
                    
        //                 nowData && nowData.map(nowElement => {
        //                     if (element.content_pid === nowElement.content_pid) {
        //                         overlapData.push(nowElement)
        //                         //console.log("같은 ID : " + nowElement.content_pid);
        //                     }
        //                 })
        //             })
    
        //             if (overlapData) {  // 위 함수에서 겹치는 데이터를 모두 push 했다면
        //                 outputMovies = overlapData; // outputMovies 교체
        //                 if (outputMovies === overlapData) {
        //                     console.log("무한루프2")
        //                     movieFiltering(outputMovies);
        //                     overlapData = []
        //                 }
        //             }
                
        //         })  // 실패시 catch 진행
        //         .catch(function (error) {
        //             alert("error발생 => " + error);
        //         })
    
        //         repetitionCount--;
        //     }
        // }
    }
    
    function searchResult() { // server에게 영화DB 받아오기

        let keyword = props.keyword;
        let genre = props.genre;
        let keywordMovieList = [];

        var url = "/search_result";

        axios.post( url, {
            postKeyword : keyword
        })  // 성공시 then 진행
        .then(function (res) {
            keywordMovieList = res.data.data
            //console.log("moviesInputSetting complete")
            //console.log("keywordMovieList : " + JSON.stringify(keywordMovieList));

            genreFilter(keywordMovieList, genre)
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    }
    
    useEffect(() => {
        searchResult(); // input창에 따른 영화 리스트 받아오기
    }, [props])


    useEffect(() => {
        //searchResult(); // input창에 따른 영화 리스트 받아오기
        getData();  // 테이블에 필요한 리스트들(장르, 국가, 배우) 받아오기

        // server에게 장르 이름 리스트 받아오기
        var genreListUrl = "/get_genre_name";

        axios.post( genreListUrl, {
        })  // 성공시 then 진행
        .then(function (res) {
            // console.log("받은 장르 리스트 : \n" + JSON.stringify(res.data.data));
            setGenresList(res.data.data);
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
            setGenresList("error");
        })

        // server에게 국가 이름 리스트 받아오기
        var countryLIstUrl = "/get_country_name";

        axios.post( countryLIstUrl, {
        })  // 성공시 then 진행
        .then(function (res) {
            // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
            setCountrysList(res.data);
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
            setCountrysList("error");
        })

        // server에게 출연 배우 이름 리스트 받아오기
        var actorListUrl = "/get_actor_name";

        axios.post( actorListUrl, {
        })  // 성공시 then 진행
        .then(function (res) {
            // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
            setActorsList(res.data);
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
            setActorsList("error");
        })
    
    }, [])  // 대괄호 비워 둠 => 컴포넌트가 처음 나타날때만 실행

    // let outputMovies = [];   // 출력 할 영화 ID 저장

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

    function outputGenre(id) {  // 장르 id코드를 한글로 변환
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
        
        getMovie && getMovie.map(movie => {
            movieTable.push(
                {
                    id: movie.content_id,
                    poster: movie.poster,
                    title: movie.title,
                    date: movie.screening_date,
                    director: movie.director,
                    age: movie.age_information,
                    // genre: outputGenre(movie.content_id),
                    // country: outputCountry(movie.content_id),
                    // actor: outputActor(movie.content_id),
                    summary: movie.summary,
                },
            )
        })
        console.log("출력할 Movies : \n" + JSON.stringify(movieTable));
    }

    return(
        <div>
            {console.log("movieTable : " + JSON.stringify(movieTable))}
        </div>
    )
}
export default MovieTableBody;