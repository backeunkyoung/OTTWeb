import React, { useState, useEffect } from 'react';
import Year_select from './Year_select';

function Search_Form(props) {
    const [keyword, setKeyword] = useState('');

    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    // Main_Page에게 input 값을 전달하기 위한 함수
    function send_Main_Page() {
        props.func(keyword);    // func : Main_Page에서 받은 Search_Form_receive 함수
    }

    return(
        <div>
            {send_Main_Page()} {/* Main_Page에게 input 값 전달 */}
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
export default Search_Form;