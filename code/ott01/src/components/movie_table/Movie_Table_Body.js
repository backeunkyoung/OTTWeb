import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function Movie_Table_Body(props) {
    // console.log("Movie_Table_Body jjjj props : \n" + JSON.stringify(props));

    const text = _.get(props, "list.list.data");

    return(
        <div>
            {console.log("props : ", JSON.stringify(props.list.list))}

            <React.Fragment>
                {/* React는 렌더링이 화면에 커밋 된 후에 모든 효과를 실행 함*/}
                {/* 즉, return에서 map을 반복 실행 할 때, movies에 첫 데이터가 아직 안들어와도 렌더링이 실행 된다. => undefined 오류 발생 */}
                {/* 따라서 movies && 조건을 추가 해 movies에 값이 있으면(true) 실행되도록 한다 */}
                {text && text.map(movie =>
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