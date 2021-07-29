import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Registration_Modal from './Registration_Modal';
import Registration_Form from './Registration_Form';

function Registration_Button() {

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
                <Button onClick={ openModal }>회원가입</Button>
            </div >
            <Registration_Modal open={ modalOpen } close={ closeModal } header="Registration Form">
            <div>
                <Registration_Form></Registration_Form>
            </div>
           </Registration_Modal>
       </React.Fragment>
   )
}
export default Registration_Button;