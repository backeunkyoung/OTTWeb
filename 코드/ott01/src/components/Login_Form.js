import React, { useState } from 'react';
import axios from 'axios';
import Registration_Button from './Registration_Button';

const Login_Form = (props) => {
    const [form, setForm] = useState({
        id: '',
        pw: '',
    });

    const { id, pw } = form;

    const { close } = props;

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
            // 여기서 받아온 response는 JSON 타입
            console.log(JSON.stringify(response));
            if (response.data.msg === "success") {
                var nic_name = response.data.nic_name;
                alert("로그인 성공!\n반갑습니다 " + nic_name + "닙!!");
                document.getElementById('closeModal').click();
            }
            else if (response.data.msg === "id_fail") {
                alert("등록되지 않은 ID 입니다.");
            }
            else if (response.data.msg === "pw_fail") {
                alert("잘못된 비밀번호 입니다.");
            }
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })

        setForm({
            id: '',
            pw: '',
        });
    };

    const add_user = () => {
        alert("add_user 실행");
        var url = "/registration";

        axios.get( url, {} )  // 성공시 then 진행
        .then(function (response) {
            if (response.data.msg === "success") {
                alert("이동");
            }
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
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
                <button type="button"
                        disabled={!id || !pw}
                        className="login_button"
                        onClick={loginCheck}>로그인
                </button>  
                {/* 양식 제출용이 아니라면 button type = "button" 으로 두면 된다. */}
            </form>
            
            <p></p>
            <div className="registration_info">
                <Registration_Button></Registration_Button>
            </div>
            <button type="hidden" id="closeModal" onClick={close}></button>
        </div>
    );
};
export default Login_Form;