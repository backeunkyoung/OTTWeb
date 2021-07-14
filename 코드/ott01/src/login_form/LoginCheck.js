import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'; //React-Router import

function LoginCheck() {
    return (
      <div>
        <h2>여기서 LoginCheck</h2>
        <hr></hr>
        <div>
          <Link to="/">
              <h1 align="center">홈으로</h1>
          </Link>
        </div>
      </div>
    )
  }
  
  export default LoginCheck