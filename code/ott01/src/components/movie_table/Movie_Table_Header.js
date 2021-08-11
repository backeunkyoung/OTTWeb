import React from 'react';

function Movie_Table_Header() {

    return(
        <div>
            <React.Fragment>
                <th>포스터</th>         {/* poster */}
                <th>제목</th>           {/* title */}
                <th>개봉 날짜</th>      {/* screening_date */}
                <th>감독</th>           {/* director */}
                <th>장르</th>           {/* attribute_genre */}
                <th>제작 국가</th>      {/* production_country */}
                <th>시청 가능 연령</th> {/* age_information */}
                <th>줄거리</th>         {/* summary */}
            </React.Fragment>
        </div>
    )
}
export default Movie_Table_Header;