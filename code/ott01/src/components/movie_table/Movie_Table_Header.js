import React from 'react';

function Movie_Table_Header() {

    return(
        <div>
            <React.Fragment>
                <th>포스터</th>
                <th>제목</th>
                <th>개봉 날짜</th>
                <th>감독</th>
                <th>시청 가능 연령</th>
                <th>장르</th>
                <th>제작 국가</th>
                <th>출연 배우</th>
                <th>줄거리</th>
            </React.Fragment>
        </div>
    )
}
export default Movie_Table_Header;