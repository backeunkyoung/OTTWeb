import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Login_Modal from './Login_Modal';

function Login_Button() {

   // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
   const [ modalOpen, setModalOpen ] = useState(false);

   const [inputs, setInputs] = useState({
       id : '',
       pw : ''
   });

   const openModal = () => {
       setModalOpen(true);
   }
   const closeModal = () => {
       setModalOpen(false);
   }

   const { id, pw } = inputs;

   const onChangeId = (e) => {
       const { value, id } = e.target;
       setInputs({
           ...inputs,   // 기존의 값 복사
           [id] : value // 덮어쓰기
       });
   };

   const onChangePw = (e) => {
        const { value, pw } = e.target;
        setInputs({
            ...inputs,   // 기존의 값 복사
            [pw] : value // 덮어쓰기
        });
    };


   return (
       <React.Fragment>
            <div style={{float: 'right'}}>
                <Button onClick={ openModal }>Login</Button>
            </div>
            <Login_Modal open={ modalOpen } close={ closeModal } header="Login Form">
            <div>
                <form>
                    <div className="id_area">
                        <input
                            type="text"
                            value={id}
                            placeholder="아이디"
                            onChangeId={onChangeId}
                        ></input>
                    </div>
                    <div className="pw_area">
                        <input type="password"
                            value={pw}
                            placeholder="비밀번호"
                            onChangePw={onChangePw}
                        ></input>
                    </div>
                    <input type="submit" value="로그인" className="loginButton"></input>
                </form>

                <div className="find_info">
                    <a href="/" target="_blank" className="idinquiry">아이디 찾기</a>
                    <span className="bar" aria-hidden="true">|</span>

                    <a href="/" target="_blank" className="pwinquiry">비밀번호 찾기</a>
                    <span className="bar" aria-hidden="true">|</span>

                    <a href="/" target="_blank" className="join">회원가입</a>
                </div>
            </div>
           </Login_Modal>
       </React.Fragment>
   )
}
export default Login_Button;