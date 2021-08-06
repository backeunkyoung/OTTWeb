import React from 'react';

function Table_Header() {

    return(
        <div>
            <React.Fragment>
                <th>포스터</th>         {/* poster */}
                <th>제목</th>           {/* title */}
                <th>감독</th>           {/* director */}
                <th>시청 가능 연령</th> {/* age_information */}
                <th>줄거리</th>         {/* summary */}
            </React.Fragment>
        </div>
    )
}
export default Table_Header;