import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ShowMore from 'react-show-more-button/dist/module';

function Movie_Table_Body(props) {
    const [movies, setMovies] = useState();
    let movieContentCount;  // 불러온 영화 컨텐츠 개수

    let keyword = props.keyword; // Search_Form의 input 값

    let genre = props.genre;  // Categori_Menu의 선택한 장르 값
    let genreLength = Object(genre).length;

    let outputMovies = []

    if (genre) {
        console.log("선택한 장르 값 : " + JSON.stringify(genre))
        genre_filter(genre)
    }

    function genre_filter(genre) { // server에게 장르 필터 결과 받아오기
        //console.log("genreLength : " + genreLength);
        //console.log("genre : " + JSON.stringify(genre));
        let repetitionCount = genreLength;

        while(repetitionCount !== 0) {
            var url = "/genre_filter";

            axios.post( url, {
                postFirstGenre : genre[repetitionCount-1].genreId
            })  // 성공시 then 진행
            .then(function (res) {
                console.log("\nrepetitionCount : " + repetitionCount);
                console.log("res : " + JSON.stringify(res.data.data));
            
                if (Object(outputMovies).length === 0) {    // 1번만 초기화
                    outputMovies = (res.data.data);
                }
                
                if (Object(outputMovies).length !== 0) {    // 초기화했으면 출력
                    console.log("outputMovies : " + JSON.stringify(outputMovies));
                    
                    outputMovies.map(element => {   // 비교하면서 겹치는 ID값만 따로 모은다
                        console.log("element : " + JSON.stringify(element.content_pid))
                    
                        res.data.data.map(nowElement => {
                            //console.log("nowElement : " + JSON.stringify(nowElement.content_pid))
                            if (element.content_pid === nowElement.content_pid) {
                                console.log("같은 ID : " + nowElement.content_pid);
                            }
                        })
                        
                    })
                }
            
            })  // 실패시 catch 진행
            .catch(function (error) {
                alert("error발생 => " + error);
                setMovies("error");
            })

            repetitionCount--;
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
        {
            // for (let i = 0; i < genreLength; i++) {
            //     console.log("선택 장르 ID : " + genre[i].genreId)
                
            //     let nowContentId = []

            //     if (genresList) {
            //         let genreListLength = Object.genreList
            //         if (movie.content_id === genresList.data[i].content_id)
            //     }
            // }
            if(true) {
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
            }
        }
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
                        <td>
                            <ShowMore className='moreButton' maxHeight={200} style={{background:'rgb(148, 148, 147)'}} styleButton={{background:'gray', float:'center'}}>{movie.summary}</ShowMore>
                        </td>
                    </tr>
                )}
            </React.Fragment>
        </div>
    )
}
export default Movie_Table_Body;