import React from 'react';
import { Button, ButtonToolbar, Tab } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'; //React-Router import
import LoginPage from '../login_form/LoginPage';
import FieldKategorie from '../kategorie/FieldKategoriePage';
import AttributeKategorie from '../kategorie/AttributeKategoriePage';
import Search_Form from '../table/Search_Form';
import '../App.css';

function First_com() {

    return (
        <div>
            <Router>
                <header>
                    <Link to="/">
                        <h1 align="center">OTT사이트</h1>
                    </Link>

                    <ButtonToolbar>
                        <div className="left-box">
                            <Link to="/FieldKategorie">
                                <Button variant="primary">분야 카테고리</Button>
                            </Link>
                            <Link to="/AttributeKategorie">
                                <Button variant="primary">특징 카테고리</Button>
                            </Link>
                        </div>

                        <div className="center-box">
                            &nbsp;
                            <b>검색</b><input type="text"></input>
                            &nbsp;
                        </div>
                
                        <div className="right-box">
                            <Link to="/LoginPage">
                                <Button variant="info">로그인</Button>
                            </Link>
                        </div>
                    </ButtonToolbar>
                </header>

                <main>
                    {/* 현재 주소 창 경로가 path 일 경우, 지정한 컴포넌트를 보여 줌*/}
                    <Route path="/FieldKategorie" component={FieldKategorie}></Route>
                    <Route path="/AttributeKategorie" component={AttributeKategorie}></Route>
                    <Route path="/LoginPage" component={LoginPage}></Route>
                </main>
            </Router>
            <hr></hr>
        </div>
    );
}
export default First_com;