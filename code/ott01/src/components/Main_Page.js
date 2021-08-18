import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'; //React-Router import
import Login_Button from './login/Login_Button';
import Kategori_Menu from './Kategori_Menu';
import Search_Form from './Search_Form';
import Movie_Table from './movie_table/Movie_Table';
import '../App.css';

// react 리렌더링 조건
// 1. state 값이 변경될 때
// 2. 새로운 props이 들어올 때
// 3. 부모 컴포넌트가 렌더링 될 때
// 4. forceUpdate가 실행될 때

function Main_Page() {
    // < 리렌더링 >
    // 1. state 값(keyword) 변경 시 리렌더링 됨

    const [keyword, setKeyword] = useState(''); // Search_From에게 받아온 input 값 저장
    const [clickGenre, setClickGenre] = useState([])// 장르 버튼 상태 관리

    useEffect(() => {
        Kategori_receive();
    }, [])

    function Search_Form_receive(data) {
        setKeyword(data);
        //console.log("Search_Form에게 받음 : " + JSON.stringify(keyword));
    }

    let genre = null

    function Kategori_receive(clickButton, buttonLength) {
        genre = clickButton
        console.log("클릭한 genre : " + JSON.stringify(genre))
        // console.log("클릭 데이터 :  " + clickButton);

        setClickGenre(genre);
        // console.log("state 데이터 : " + clickGenre)
    }

    return (
        <div>
            <Router>
                <header>
                    <Link to="/">
                        <h1 align="center">OTT사이트</h1>
                    </Link>
                    <div>
                        <Login_Button></Login_Button>
                    </div>
                    <Kategori_Menu func={Kategori_receive}></Kategori_Menu> {/* Kategori_Menu 에서 필터값을 받기 위한 함수 전달 */}
                </header>

                <body>
                    <div>
                        <Search_Form func={Search_Form_receive}></Search_Form>  {/* Search_Form 에서 input값을 받기 위한 함수 전달 */}
                    </div>
                    
                    <hr></hr>
                    <br></br>
                    <div className="body-container">
                        <div className="body-left-box">
                            <button>왼쪽</button>
                        </div>

                        <div className="body-center-box">
                            <Movie_Table keyword={keyword} genre={genre}></Movie_Table> {/* Search_Form 에게 받아온 input값 전달 */}
                        </div>

                        <div className="body-right-box">
                            <button>오른쪽</button>
                        </div>
                    </div>
                </body>
            </Router>
            <hr></hr>
        </div>
    );
}
export default Main_Page;