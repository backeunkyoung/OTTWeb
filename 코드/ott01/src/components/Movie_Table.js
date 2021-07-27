import React, { useEffect } from "react";
import jquery from "jquery";
import $ from 'jquery';
import axios from 'axios';

// server 호출
function Movie_Table() {
    // 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 해줌
    // 컴포넌트가 mount, unmount, update 되었을 때 특정 작업 실행
    useEffect(() => {
        axios.get('/movieTable')
            .then( response => {
                return (
                    <div>
                        {response.data}
                    </div>
                );
            }
        );
    }, []); // [] : 빈 배열 => 화면에 가장 처음 렌더링 될 때 1번만 실행
}

export default Movie_Table