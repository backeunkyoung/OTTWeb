import React, { useState } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'; //React-Router import
import LoginButton from './login/LoginButton';
import CategoriMenu from './CategoriMenu';
import SearchForm from './SearchForm';
import MovieTable from './movieTable/MovieTable';
import '../App.css';

// react 리렌더링 조건
// 1. state 값이 변경될 때
// 2. 새로운 props이 들어올 때
// 3. 부모 컴포넌트가 렌더링 될 때
// 4. forceUpdate가 실행될 때

function MainPage() {
    const [keyword, setKeyword] = useState(''); // Search_From에게 받아온 input 값 저장
    const [clickGenre, setClickGenre] = useState([])// 장르 버튼 상태 관리
    const [clickCountry, setClickCountry] = useState([])// 국가 버튼 상태 관리

    function SearchFormReceive(data) {
        setKeyword(data);
        //console.log("받은 keyword : " + JSON.stringify(keyword));
    }

    let genre = null;
    let country = null;

    function KategoriReceive(genreButton, countryButton) {
        genre = genreButton;
        setClickGenre(genre);

        country = countryButton;
        setClickCountry(country);
        //console.log("받은 genre : " + JSON.stringify(genre));
    }

    return (
        <div>
            <Router>
                <header>
                    <Link to="/">
                        <h1 align="center">OTT사이트</h1>
                    </Link>
                    <div>
                        <LoginButton></LoginButton>
                    </div>
                    <CategoriMenu func={KategoriReceive}></CategoriMenu> {/* Kategori_Menu 에서 필터값을 받기 위한 함수 전달 */}
                </header>

                <body>
                    <div>
                        <SearchForm func={SearchFormReceive}></SearchForm>  {/* Search_Form 에서 input값을 받기 위한 함수 전달 */}
                    </div>
                    
                    <hr></hr>
                    <br></br>
                    <div className="body-container">
                        <div className="body-left-box">
                            <button>왼쪽</button>
                        </div>

                        <div className="body-center-box">
                            <MovieTable keyword={keyword} genre={clickGenre} country={clickCountry}></MovieTable> {/* Search_Form 에게 받아온 input값 전달 */}
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
export default MainPage;