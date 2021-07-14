// 여기에서 HTML 템플릿 및 JavaScript의 컴포넌트를 조합하여 렌더링하고, 실제로 표시한다.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(  // 브라우저 상에 리액트 컴포넌트를 보여주기 위해 사용
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
