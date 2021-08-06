import React from 'react';
import '../../App.css';

const Registration_Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    // open={ modalOpen } close={ closeModal } header="Registration Form"
    const { open, close, header } = props;

    return (
        // 모달이 열릴때 'openModal modal' 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  // open === true, 즉 열리게 하는 것이 목적
                <section>
                    <header>
                        {/* header="Registration Form" */}
                        {header}

                        {/* 닫는 버튼 */}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        {/* 자식요소를 가져 옴 => <Registration_Form></Registration_Form>*/}
                        {props.children}
                    </main>
                </section>
            ) : null }
        </div>
    )
}

export default Registration_Modal;