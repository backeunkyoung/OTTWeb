import React, { useState, useEffect } from 'react';

function Movie_Table_Body(props) {
    console.log("Movie_Table_Body props : \n" + JSON.stringify(props.list));

    const [movies, setMovies] = useState(null);

    useEffect(() => {   // 컴포넌트가 렌더링 될 때마다 특정 작업 실행
        setMovies(props);
    }, [movies]);  // movies가 바뀔 때 실행


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
export default Movie_Table_Body;