import React, { useState } from 'react';
import axios from 'axios';

function Search_Form() {
    const [keyword, setKeyword] = useState();

    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    return(
        <div>
            <input
                type="text"
                name="keyword"
                placeholder="제목, 배우, 감독 등 검색"
                value={keyword}
                onChange={onChange}
            ></input>
            {keyword} {/* 확인용 */}
        </div>
    )
}
export default Search_Form;