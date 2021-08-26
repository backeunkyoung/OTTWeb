import React, { useState, useEffect } from 'react';
import YearSelect from './YearSelect';

// react 리렌더링 조건
// 1. state 값이 변경될 때
// 2. 새로운 props이 들어올 때
// 3. 부모 컴포넌트가 렌더링 될 때
// 4. forceUpdate가 실행될 때

function SearchForm(props) {
    const [keyword, setKeyword] = useState('');

    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    // 해당 컴포넌트가 렌더링 될 때마다(keyword 값 변경 시) 실행됨
    useEffect(() => {
        sendMainPage(); // Main_Page에게 input 값 전달
    });

    // Main_Page에게 input 값을 전달하기 위한 함수
    function sendMainPage() {

        // func : Main_Page에서 받은 Search_Form_receive 함수
        props.func(keyword);
    }

    return(
        <div>
            <br></br>
            <div>
                <div className='main-left-box'>
                    <input
                        type="text"
                        name="keyword"
                        placeholder="제목, 배우, 감독 검색"
                        value={keyword}
                        onChange={onChange}
                    ></input>
                </div>
                
                <div className='main-right-box'>
                    <YearSelect></YearSelect>
                </div>
            </div>

        </div>
    )
}
export default SearchForm;