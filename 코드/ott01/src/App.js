// 컴포넌트를 정의하는 프로그램
// 실제로 화면에 표시되는 내용들을 정의함
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import First_com from './components/First_com';
import Content_Table from './movie_table/Content_Table';

function App() {
  return (
    <div>
      <div>
        <First_com></First_com>
      </div>
    </div>
  );
}

export default App;