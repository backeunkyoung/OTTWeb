import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'; //React-Router import
import Login_Button from './Login_Button';
import Button_tool from './Kategori_Menu';
import Movies from '../test/Movies';
import '../App.css';

function First_com() {

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
export default First_com;