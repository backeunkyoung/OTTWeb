import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Login_Modal from './Login_Modal';
import Login_Form from './Login_Form';

function Login_Button() {

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
            <Login_Modal open={ modalOpen } close={ closeModal } header="Login Form">
            <div>
                <Login_Form close={ closeModal }></Login_Form>
            </div>
           </Login_Modal>
       </React.Fragment>
   )
}
export default Login_Button;