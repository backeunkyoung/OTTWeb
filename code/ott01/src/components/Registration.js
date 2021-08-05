import React, { useEffect } from "react";
import axios from 'axios';

// server 호출
function Registration() {
    // 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 해줌
    // 컴포넌트가 mount, unmount, update 되었을 때 특정 작업 실행
    useEffect(() => {
        axios.get('/registration')
            .then( response => {
                return (
                    <div>
                        <h1>등록</h1>
                    </div>
                );
            }
        );
    }, []); // [] : 빈 배열 => 화면에 가장 처음 렌더링 될 때 1번만 실행
}

export default Registration