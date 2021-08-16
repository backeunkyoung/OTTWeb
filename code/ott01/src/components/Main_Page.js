import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'; //React-Router import
import Login_Button from './login/Login_Button';
import Kategori_Menu from './Kategori_Menu';
import Search_Form from './Search_Form';
import Movie_Table from './movie_table/Movie_Table';
import '../App.css';

function Main_Page() {
    
    function search_receive(data) {
        console.log("search에게 받음 : " + JSON.stringify(data));
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
                    <Kategori_Menu></Kategori_Menu>
                </header>

                <body>
                    <div>
                        <Search_Form func={search_receive}></Search_Form>
                    </div>
                    
                    <hr></hr>
                    <br></br>
                    <div className="body-container">
                        <div className="body-left-box">
                            <button>왼쪽</button>
                        </div>

                        <div className="body-center-box">
                            <Movie_Table list={movies}></Movie_Table>
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