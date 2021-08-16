import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'; //React-Router import
import Login_Button from './login/Login_Button';
import Kategori_Menu from './Kategori_Menu';
import Search_Form from './Search_Form';
import Movie_Table from './movie_table/Movie_Table';
import '../App.css';

function Main_Page() {
    const [keyword, setKeyword] = useState(''); // Search_From에게 받아온 input 값 저장
    
    function Search_Form_receive(data) {
        setKeyword(data);
        //console.log("Search_Form에게 받음 : " + JSON.stringify(keyword));
    }

    function Kategori_receive(genre, country) {
        console.log("Kategori_Menu에게 받음 \n장르 : " + JSON.stringify(genre) + "\n국가 : " + JSON.stringify(country));
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
                            <Movie_Table keyword={keyword}></Movie_Table> {/* Search_Form 에게 받아온 input값 전달 */}
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