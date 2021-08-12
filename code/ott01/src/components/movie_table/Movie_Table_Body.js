import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

function Movie_Table_Body(props) {  // props는 Search_Form에서 받아온 영화 정보

    const [genresList, setGenresList] = useState({   // 장르 목록
        content_id: '',
        genre_name: '',
    });

    const [countrysList, setCountrysList] = useState({   // 국가 목록
        content_id: '',
        country_name: '',
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
    }, [])  // 대괄호 비워 둠 => 컴포넌트가 처음 나타날때만 실행


    const check_undefined = _.get(props, "list.list.data");

    var tableBody = [];

    function outputGenre(id) {
        var result = '';
        var size = genresList.data.length;

        for (let i = 0; i < size; i++) {
            if (genresList.data[i].content_id === id) {
                result += genresList.data[i].attribute_name + "\n";
            }
        }
        return result;
    }

    function outputCountry(id) {
        var result = '';
        var size = countrysList.data.length;

        for (let i = 0; i < size; i++) {
            if (countrysList.data[i].content_id === id) {
                result += countrysList.data[i].country_name + "\n";
            }
        }
        return result;
    }

    check_undefined && check_undefined.map(movie =>
        tableBody.push(
            {
                id: movie.content_id,
                poster: movie.poster,
                title: movie.title,
                date: movie.screening_date,
                director: movie.director,
                genre: outputGenre(movie.content_id),
                country: outputCountry(movie.content_id),
                age: movie.age_information,
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
                        <td>{movie.genre}</td>
                        <td>{movie.country}</td>
                        <td>{movie.age}</td>
                        <td>{movie.summary}</td>
                    </tr>
                )}
            </React.Fragment>
        </div>
    )
}
export default Movie_Table_Body;