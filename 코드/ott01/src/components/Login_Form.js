import React, { useState } from 'react';
import axios from 'axios';

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
        alert("체크중");
        console.log("로그인 체크 중, id : " + id + " , pw : " + pw);

        var url = "/login";

        axios.post( url, {
            postId : id,
            postPw : pw
        })  // 성공시 then 진행
        .then(function (response) {
            if (JSON.stringify(response.data.msg) === JSON.stringify("success")) {
                alert("로그인 성공");
                document.location.href = '/';
            }
            else if ((JSON.stringify(response.data.msg) === JSON.stringify("id_fail"))) {
                alert("등록되지 않은 ID 입니다.");
            }
            else if ((JSON.stringify(response.data.msg) === JSON.stringify("pw_fail"))) {
                alert("잘못된 비밀번호 입니다.");
            }
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert(error);
        })  // 성공하던 실패하던 항상 실행
        .then(function () {
            console.log("post 함수 실행됨");
        });

        setForm({
            id: '',
            pw: '',
        });
    };

    return (
        <div>
            <form className="login_form">
                <div className="login_input">
                    <div className="id_form">
                        <input
                            type="text"
                            name="id"
                            placeholder="아이디"
                            value={id}
                            onChange={onChange}
                        ></input>
                    </div>
                    <p></p>
                    <div className="pw_form">
                        <input
                            type="password"
                            name="pw"
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