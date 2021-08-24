import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

function Movie_Table_Body(props) {
    let keyword = props.keyword;
    let genres = props.genre;
    let selectId = [];

    let movies = [];    // 영화 데이터(키워드에 따른)

    let genreList = []  // 장르 목록

    function getGenreList() {

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

            console.log("받은 장르 리스트 : \n" + JSON.stringify(genreList));
    
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    }

    function genre_filter(moviesInputSetting) { // 장르 버튼에 따른 필터 결과값 받아오기(content_pid로 저장)
        let repetitionCount = Object(genres).length;

        getGenreList();

        // genresList && genresList.map((element) => {
        //     console.log("장르 목록 보기 : " + JSON.stringify(element));
        // })

        moviesInputSetting && moviesInputSetting.map((element) => {
            console.log("inputMovieId: " + JSON.stringify(element.content_id));
        })

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
    
    search_result(keyword);
    function search_result(keyword) { // server에게 영화DB 받아오기
        var url = "/search_result";
        let moviesInputSetting = [];

        axios.post( url, {
            postKeyword : keyword
        })  // 성공시 then 진행
        .then(function (res) {
            console.log("현재 keyword : " + keyword);
            console.log("현재 genres : " + JSON.stringify(genres));
            moviesInputSetting = res.data.data
            console.log("moviesInputSetting complete")
            genre_filter(moviesInputSetting)
            //console.log("moviesInputSetting : " + JSON.stringify(moviesInputSetting));
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    }
    

    useEffect(() => {   // 테이블에 필요한 리스트들(장르, 국가, 배우) 받아오기
        // server에게 장르 이름 리스트 받아오기
        // var genreListUrl = "/get_genre_name";

        // axios.post( genreListUrl, {
        // })  // 성공시 then 진행
        // .then(function (res) {
        //     // console.log("받은 장르 리스트 : \n" + JSON.stringify(res.data.data));
        //     setGenresList(res.data.data);
        // })  // 실패시 catch 진행
        // .catch(function (error) {
        //     alert("error발생 => " + error);
        //     setGenresList("error");
        // })

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

    // let outputMovies = [];   // 출력 할 영화 ID 저장

    // const [genresList, setGenresList] = useState({   // 장르 목록
    //     content_id: '',
    //     genre_name: '',
    // });

    // const [countrysList, setCountrysList] = useState({   // 국가 목록
    //     content_id: '',
    //     country_name: '',
    // });

    // const [actorsList, setActorsList] = useState({   // 출연 배우 목록
    //     content_id: '',
    //     actor_name: '',
    // });

    // // if (genre) {
    // //     console.log("선택한 장르 값 : " + JSON.stringify(genre))
    // //     genre_filter(genre)
    // // }

    // function genre_filter(genre) { // 장르 버튼에 따른 필터 결과값 받아오기(content_pid로 저장)
    //     let repetitionCount = Object(genre).length;

    //     let once = true;

    //     if (repetitionCount === 0) {    // 아무 장르 버튼도 선택되지 않은 경우, 모든 영화 ID값을 넘김
    //         let genrePush = []

    //         movies && movies.map(element => {
    //             genrePush.push({
    //                 content_pid: element.content_id
    //             });
    //         })

    //         if (Object(genrePush).length !== 0) {
    //             genre = genrePush;
    //             if (genre === genrePush) {
    //                 console.log("무한루프1")
    //                 movieFiltering(genre);
    //             }
    //         }
    //     }
    //     else {  // 장르 버튼을 선택한 경우, 해당되는 장르의 ID값을 넘김
    //         while(repetitionCount !== 0) {
    //             var url = "/genre_filter";
    
    //             axios.post( url, {
    //                 postFirstGenre : genre[repetitionCount-1].genreId
    //             })  // 성공시 then 진행
    //             .then(function (res) {
    //                 //console.log("\n현재 장르 : " + JSON.stringify(res.data.genreNum));
                
    //                 let nowData = res.data.data
    
    //                 if (once && nowData && Object(outputMovies).length === 0) {    // 1번만 초기화
    //                     outputMovies = nowData;
    //                     once = false;
    //                 }
                    
    //                 let overlapData = []    // 겹치는 값만 저장할 배열
                    
    //                 outputMovies && outputMovies.map(element => {   // 비교하면서 겹치는 ID값만 push하기
                    
    //                     nowData && nowData.map(nowElement => {
    //                         if (element.content_pid === nowElement.content_pid) {
    //                             overlapData.push(nowElement)
    //                             //console.log("같은 ID : " + nowElement.content_pid);
    //                         }
    //                     })
    //                 })
    
    //                 if (overlapData) {  // 위 함수에서 겹치는 데이터를 모두 push 했다면
    //                     outputMovies = overlapData; // outputMovies 교체
    //                     if (outputMovies === overlapData) {
    //                         console.log("무한루프2")
    //                         movieFiltering(outputMovies);
    //                         overlapData = []
    //                     }
    //                 }
                
    //             })  // 실패시 catch 진행
    //             .catch(function (error) {
    //                 alert("error발생 => " + error);
    //             })
    
    //             repetitionCount--;
    //         }
    //     }
    // }

    // function search_result(keyword) { // server에게 영화DB 받아오기
    //     var url = "/search_result";

    //     axios.post( url, {
    //         postKeyword : keyword
    //     })  // 성공시 then 진행
    //     .then(function (res) {
    //         console.log("keyword : " + keyword);
    //         //movies = res.data.data
    //         console.log("All movies Setting")
    //         //genre_filter(movieState.genres)
    //         //console.log("res : " + JSON.stringify(res.data.data));
    //     })  // 실패시 catch 진행
    //     .catch(function (error) {
    //         alert("error발생 => " + error);
    //         // setMovieState({
    //         //     movies : "error"
    //         // });
    //     })
    // }

    // useEffect(() => {   // 컴포넌트가 렌더링 될 때마다 server에게 영화DB 받아오기
    //     search_result(keyword);
    // }, []);  // keyword가 바뀔 때 실행

    // useEffect(() => {   // 테이블에 필요한 리스트들(장르, 국가, 배우) 받아오기
    //     // server에게 장르 이름 리스트 받아오기
    //     var genreListUrl = "/get_genre_name";

    //     axios.post( genreListUrl, {
    //     })  // 성공시 then 진행
    //     .then(function (res) {
    //         // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
    //         setGenresList(res.data);
    //     })  // 실패시 catch 진행
    //     .catch(function (error) {
    //         alert("error발생 => " + error);
    //         setGenresList("error");
    //     })

    //     // server에게 국가 이름 리스트 받아오기
    //     var countryLIstUrl = "/get_country_name";

    //     axios.post( countryLIstUrl, {
    //     })  // 성공시 then 진행
    //     .then(function (res) {
    //         // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
    //         setCountrysList(res.data);
    //     })  // 실패시 catch 진행
    //     .catch(function (error) {
    //         alert("error발생 => " + error);
    //         setCountrysList("error");
    //     })

    //     // server에게 출연 배우 이름 리스트 받아오기
    //     var actorListUrl = "/get_actor_name";

    //     axios.post( actorListUrl, {
    //     })  // 성공시 then 진행
    //     .then(function (res) {
    //         // console.log("받은 결과 : \n" + JSON.stringify(res.data.data));
    //         setActorsList(res.data);
    //     })  // 실패시 catch 진행
    //     .catch(function (error) {
    //         alert("error발생 => " + error);
    //         setActorsList("error");
    //     })
    
    // }, [])  // 대괄호 비워 둠 => 컴포넌트가 처음 나타날때만 실행

    // function outputGenre(id) {  // 장르 id코드를 한글로 변환
    //     var result = '';

    //     if (genresList) {
    //         var size = genresList.data.length;

    //         for (let i = 0; i < size; i++) {
    //             if (genresList.data[i].content_id === id) {
    //                 result += genresList.data[i].attribute_name + ", ";
    //             }
    //         }

    //         return result;
    //     }
    // }

    // function outputCountry(id) {    // 국가 id코드를 한글로 변환
    //     var result = '';

    //     if (countrysList) {
    //         var size = countrysList.data.length;

    //         for (let i = 0; i < size; i++) {
    //             if (countrysList.data[i].content_id === id) {
    //                 result += countrysList.data[i].country_name + ", ";
    //             }
    //         }

    //         return result;
    //     }
    // }

    // function outputActor(id) {  // 배우 id코드를 한글로 변환
    //     var result = '';
        
    //     if (actorsList.data) {
    //         var size = actorsList.data.length;

    //         for (let i = 0; i < size; i++) {
    //             if (actorsList.data[i].content_id === id) {
    //                 result += actorsList.data[i].Name + ", ";
    //             }
    //         }

    //         return result;
    //     }
    // }

    // function movieFiltering(outputMovies) { // 출력할 영화 목록 셋팅
    //     //console.log("셋팅할 outputMovies : \n" + JSON.stringify(outputMovies));
    //     let filterMovie = []
        
    //     outputMovies.map(printId => {
    //         movies && movies.map(movie => {
    //             if (printId.content_pid === movie.content_id) {
    //                 //console.log("겹치는 title : " + movie.title)
    //                 filterMovie.push(
    //                     {
    //                         id: movie.content_id,
    //                         poster: movie.poster,
    //                         title: movie.title,
    //                         date: movie.screening_date,
    //                         director: movie.director,
    //                         age: movie.age_information,
    //                         genre: outputGenre(movie.content_id),
    //                         country: outputCountry(movie.content_id),
    //                         actor: outputActor(movie.content_id),
    //                         summary: movie.summary,
    //                     },
    //                 )
                    
    //             }
    //         })
    //     })
    //     outputMovies = filterMovie;
    //     console.log("outputMovies setting");
    // }

    return(
        <div>
            <h1>출력</h1>
        </div>
    )
}
export default Movie_Table_Body;