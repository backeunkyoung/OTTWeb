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
        alert("로그인 체크 중, id : " + id + " , pw : " + pw);
        console.log("체크중");

        var postData = {    // server.js로 보낼 data
            postId : id,
            postPw : pw
        };

        var url = "/login";
        
        var succFn = function(receiveData) {
            if (receiveData.msg === "success") {
                alert("로그인 성공");
            }
            else if (receiveData.msg === "fail") {
                alert("로그인 실패 ㅜ.ㅜ");
            }
            console.log("server msg : " + receiveData);
        }
        
        // server.js로 데이터 보냄
        get_axios(url, postData, succFn);

        setForm({
            id: '',
            pw: '',
        });
    };

    function get_axios(url, postData, succFn) {
        axios({
            method : 'post',
            url : url,
            data : postData,
            success : succFn
        })
    }

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