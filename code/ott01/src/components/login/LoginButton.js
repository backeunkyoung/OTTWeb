import React, { useState } from 'react';
import { Button } from 'reactstrap';
import LoginModal from './LoginModal';
import LoginForm from './LoginForm';

function LoginButton() {

   // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
   const [ modalOpen, setModalOpen ] = useState(false);

   const openModal = () => {
       setModalOpen(true);
   }
   const closeModal = () => {
       setModalOpen(false);
   }

   return (
       <React.Fragment>
            <div style={{float: 'right'}}>
                <Button onClick={ openModal }>Login</Button>
            </div >
            <LoginModal open={ modalOpen } close={ closeModal } header="Login Form">
            <div>
                <LoginForm close={ closeModal }></LoginForm>
            </div>
           </LoginModal>
       </React.Fragment>
   )
}
export default LoginButton;