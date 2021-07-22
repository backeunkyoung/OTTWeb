import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'; //React-Router import
import Login_Button from './Login_Button';
import Test from './Login_Form';
import Button_tool from './Kategori_Menu';
import Movies from '../movies/Movies';
import '../App.css';

function Main_Page() {

    return (
        <div>
            <Router>
                <header>
                    <Link to="/">
                        <h1 align="center">OTT사이트</h1>
                    </Link>
                    <div>
                        {/* <Test></Test> */}
                        <Login_Button></Login_Button>
                    </div>
                    <Button_tool></Button_tool>
                </header>

                <body>
                    <div>
                        <br></br>
                        <Movies></Movies>
                    </div>
                </body>
            </Router>
            <hr></hr>
        </div>
    );
}
export default Main_Page;