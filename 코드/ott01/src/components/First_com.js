import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'; //React-Router import
import LoginPage from '../login_form/LoginPage';
import FieldKategorie from '../kategorie/FieldKategoriePage';
import AttributeKategorie from '../kategorie/AttributeKategoriePage';
import Button_tool from './Button_tool';
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
                    <Button_tool></Button_tool>
                </header>

                <main>
                    {/* 현재 주소 창 경로가 path 일 경우, 지정한 컴포넌트를 보여 줌*/}
                    <Route path="/FieldKategorie">
                        <FieldKategorie></FieldKategorie>
                    </Route>
                    <Route path="/AttributeKategorie">
                        <AttributeKategorie></AttributeKategorie>
                    </Route>
                    <Route path="/LoginPage">
                        <LoginPage></LoginPage>
                    </Route>
                </main>

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