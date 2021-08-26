import React, { useState } from 'react';
import { Button } from 'reactstrap';
import RegistrationModal from './RegistrationModal';
import RegistrationForm from './RegistrationForm';

function RegistrationButton() {

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
           {/* 오른쪽 끝에 '회원가입' 버튼 */}
            <div style={{float: 'right'}}>
                <Button onClick={ openModal }>회원가입</Button>
            </div >

            <RegistrationModal open={ modalOpen } close={ closeModal } header="Registration Form">
                {/* 모달 창 안의 내용 */}
                <div>
                    <RegistrationForm close={ closeModal }></RegistrationForm>
                </div>
           </RegistrationModal>
       </React.Fragment>
   )
}
export default RegistrationButton;