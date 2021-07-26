// 컴포넌트를 정의하는 프로그램
// 실제로 화면에 표시되는 내용들을 정의함
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import Main_Page from './components/Main_Page';

function App() {

  return (
    <div>
      <div>
        {/* <LandingPage></LandingPage> */}
        <Main_Page></Main_Page>
      </div>
    </div>
  );
}

export default App;