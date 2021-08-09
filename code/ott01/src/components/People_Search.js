import React from 'react';
import axios from 'axios';

function People_Search() {

    return(
        <div>
            <form>
                <select name="category" >
                    <option value="ti"selected>제목,감독</option>
                    <option value="ac">배우</option>
                    <input type="text" id="search" name="search" placeholder="검색어를 입력하세요.">
                    <input type="submit" value="Search" >
                </select>
            </form>
        </div>
    )
}
export default People_Search;