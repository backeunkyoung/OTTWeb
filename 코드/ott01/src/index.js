// 여기에서 HTML 템플릿 및 JavaScript의 컴포넌트를 조합하여 렌더링하고, 실제로 표시한다.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(  // 브라우저 상에 리액트 컴포넌트를 보여주기 위해 사용
  // <React.StrictMode> // React의 Strict Mode : 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구 => 개발모드에서만 활성화 됨
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
