import React from 'react';
import LoginPageForm from './components/LoginPageForm';

function LoginPage() {

  return (
    <div>
      <h2 id="login_page_title">Login Page</h2>
      <LoginPageForm></LoginPageForm>
      <div>
          <a href="/">메인 화면으로</a>
      </div>
    </div>
  )
}
  
export default LoginPage