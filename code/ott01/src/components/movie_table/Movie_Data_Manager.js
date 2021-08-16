import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Movie_Data_Manager(props) {
    const [movies, setMovies] = useState();

    useEffect(() => {   // 컴포넌트가 렌더링 될 때마다 특정 작업 실행
        search_result(keyword);
    }, [keyword]);  // keyword가 바뀔 때 실행

    function sendFunction() {
        props.func(movies);
    }

    return(
        <div>
            {sendFunction()}
            <br></br>
            <div>
                <div className='main-left-box'>
                    <input
                        type="text"
                        name="keyword"
                        placeholder="제목, 배우, 감독 등 검색"
                        value={keyword}
                        onChange={onChange}
                    ></input>
                </div>
                
                <div className='main-right-box'>
                    <Year_select></Year_select>
                </div>
            </div>
        </div>
    )
}
export default Movie_Data_Manager