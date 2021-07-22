import React, { useState } from 'react';
import jquery from 'jquery';
import $ from 'jquery';

const EventPractice = () => {
    const [form, setForm] = useState({
        id: '',
        pw: '',
    });

    const { id, pw } = form;

    const onChange = (e) => {
        const nextForm = {
            ...form, //기존의 form내용을 복사
            [e.target.name]: e.target.value, // 원하는 값을 덮어 씌운다
        };
        setForm(nextForm);
    };

    const loginCheck = () => {
        alert(id + " : " + pw);
        setForm({
            id: '',
            pw: '',
        });

        // var postData = {
        //     id : $(".id").val(),    // className = id 인 값을 가져옴
        //     pw : $(".pw").val()
        // }
        // var url = "login_check.html"    // 이동할 url

        // var succFn = function(receiveData) {   // 서버에서 data 값을 받아오면 실행됨
        //     if (receiveData.msg === "success") {    // 받은 데이터가 success면 실행
        //         alert("로그인에 성공하셨습니다.");
        //     }
        //     else {
        //         if (receiveData.msg === "id_fail") {
        //             alert("login 실패, 등록되지 않은 id 입니다.");
        //             window.location="login.html";   // 새로고침
        //         }
        //         else if (receiveData.msg === "pw_fail") {
        //             alert("login 실패, 잘못된 비밀번호 입니다.");
        //             window.location="login.html";
        //         }
                
        //     }
        //     console.log('server msg = ' + receiveData);
        // };

        // // 비동기 처리 : 하나의 작업의 종료까지 기다리지 않고, 다음 작업을 진행하는 비순차적인 처리방식
        // get_ajax(url, postData, succFn);
    };
    
    // function get_ajax(url, data, succFn) {
    //     $.ajax({    // 비동기 JavaScript의 라이브러리
    //         type: "POST",       // HTTP 요청 방식
    //         dataType: "json",   // 서버에서 보내줄 데이터의 타입
    //         data: data,         // HTTP 요청과 함께 서버로 보낼 데이터
    //         url: url,           // 클라이언트가 요청한 url 페이지
    //         success: succFn
    //     })
    // }

    return (
        <div>
            <form className="login_form">
                <div className="login_input">
                    <div className="id_form">
                        <input
                            type="text"
                            className="id"
                            placeholder="아이디"
                            value={id}
                            onChange={onChange}
                        ></input>
                    </div>
                    <p></p>
                    <div className="pw_form">
                        <input
                            type="password"
                            className="pw"
                            placeholder="비밀번호"
                            value={pw}
                            onChange={onChange}
                        ></input>
                    </div>
                </div>

                <p></p>
                <button className="login_button" onClick={loginCheck}>로그인</button>              
            </form>
            <p></p>
            <div className="find_info">
                <a href="/" target="_blank" className="idinquiry">아이디 찾기</a>
                <span className="bar" aria-hidden="true"> | </span>

                <a href="/" target="_blank" className="pwinquiry">비밀번호 찾기</a>
                <span className="bar" aria-hidden="true"> | </span>

                <a href="/" target="_blank" className="join">회원가입</a>
            </div>

        </div>
    );
};
export default EventPractice;