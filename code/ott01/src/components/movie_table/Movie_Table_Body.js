import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

function Movie_Table_Body(props) {
    const [movies, setMovies] = useState();

    let keyword = props.keyword; // Search_Form의 input 값

    let genre = props.genre;  // Categori_Menu의 선택한 장르 값
    let genreLength = Object(genre).length;

    let outputMovies = []   // 출력 할 영화 ID 저장

    let tableBody = []; // TableBody에 넣을 데이터

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

    if (genre) {
        console.log("선택한 장르 값 : " + JSON.stringify(genre))
        genre_filter(genre)
    }

    function genre_filter(genre) { // 장르 버튼에 따른 필터 결과값 받아오기(content_pid로 저장)
        let repetitionCount = genreLength;

        let flag = true;

        if (repetitionCount === 0) {    // 아무 장르 버튼도 선택되지 않은 경우, 모든 영화 ID값을 넘김
            let genrePush = []
            movies && movies.map(element => {
                genrePush.push({
                    content_pid: element.content_id
                });
                //console.log("genre : " + JSON.stringify(element))
            })
            if (Object(genrePush).length !== 0) {
                genre = genrePush;
                if (genre === genrePush) {
                    movieFiltering(genre);
                    //console.log("출력 genre : \n" + JSON.stringify(genre))
                }
            }
        }
        else {
            while(repetitionCount !== 0) {
                var url = "/genre_filter";
    
                axios.post( url, {
                    postFirstGenre : genre[repetitionCount-1].genreId
                })  // 성공시 then 진행
                .then(function (res) {
                    console.log("\n현재 장르 : " + JSON.stringify(res.data.genreNum));
                    //console.log("res : \n" + JSON.stringify(res.data.data));
                
                    let nowData = res.data.data
    
                    if (nowData) {
                        //console.log("nowData : \n" + JSON.stringify(nowData))
                    }
    
                    if (flag && nowData && Object(outputMovies).length === 0) {    // 1번만 초기화
                        outputMovies = nowData;
                        // console.log("outputMoviesLength : " + Object(outputMovies).length);
                        flag = false;
                    }
                    
                    let overlapData = []    // 겹치는 값만 저장할 배열
                    
                    outputMovies && outputMovies.map(element => {   // 비교하면서 겹치는 ID값만 push하기
                        //console.log("outputMovies : " + JSON.stringify(element))
                    
                        nowData && nowData.map(nowElement => {
                            //console.log("nowElement : " + JSON.stringify(nowElement.content_pid))
                            if (element.content_pid === nowElement.content_pid) {
                                overlapData.push(nowElement)
                                //console.log("같은 ID : " + nowElement.content_pid);
                            }
                        })
                    })
    
                    if (overlapData) {  // 위 함수에서 겹치는 데이터를 모두 push 했다면
                        outputMovies = overlapData; // outputMovies 교체
                        if (outputMovies === overlapData) {
                            //console.log("새로운 outputMovies : " + JSON.stringify(outputMovies));
                            movieFiltering(outputMovies);
                            overlapData = []
                        }
                        //console.log("overlapData : " + JSON.stringify(overlapData));
                    }
                
                })  // 실패시 catch 진행
                .catch(function (error) {
                    alert("error발생 => " + error);
                    setMovies("error");
                })
    
                repetitionCount--;
            }
        }
    }

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

    useEffect(() => {
        // server에게 장르 이름 리스트 받아오기
        var genreListUrl = "/get_genre_name";

        axios.post( genreListUrl, {
        })  // 성공시 then 진행
        .then(function (res) {
            // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
            setGenresList(res.data);
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

    function movieFiltering(outputMovies) { // 출력할 영화 목록 셋팅
        console.log("셋팅할 outputMovies : \n" + JSON.stringify(outputMovies));
        let moviePush = []

        outputMovies.map(printId => {
            movies && movies.map(movie => {
                if (printId.content_pid === movie.content_id) {
                    //console.log("겹치는 title : " + movie.title)
                    moviePush.push(
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
                }
            })
        })

        if (moviePush) {
            tableBody = moviePush
            if (tableBody === moviePush) {
                tableBody.map(element => {
                    console.log("tableBody의 title : \n" + JSON.stringify(element.title))
                })
            }
        }
    }

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