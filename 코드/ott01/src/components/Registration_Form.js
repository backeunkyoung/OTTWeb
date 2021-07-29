import React, { useState } from 'react';
import axios from 'axios';

const Registration_Form = () => {
  const [form, setForm] = useState({
    id: '',
    nic_name: '',
    pw: '',
    age: '',
  });

  const { id, nic_name, pw , age } = form;

  const onChange = (e) => {
    const nextForm = {
        ...form, //기존의 form내용을 복사
        [e.target.name]: e.target.value, // 원하는 값을 덮어 씌운다
    };
    setForm(nextForm);
  };

  const registration = () => {
    alert("회원가입 클릭 함\nid : " + id + " , nic_name : " + nic_name + ", pw : " + pw + ", age : " + age);
    
    var url = "/registration";

    axios.post( url, {
        postId : id,
        postNicName : nic_name,
        postPw : pw,
        postAge : age
    })  // 성공시 then 진행
    .then(function (response) {
        // 여기서 받아온 response는 JSON 타입
        console.log(JSON.stringify(response));
        if (response.data.msg === "success") {
            alert("회원가입 성공!");
        }
        else if (response.data.msg === "id_fail") {
            alert("중복된 ID 입니다.");
            console.log(JSON.stringify(response.data.msg));
        }
    })  // 실패시 catch 진행
    .catch(function (error) {
        alert("error발생 => " + error);
    })

    setForm({
      id: '',
      nic_name: '',
      pw: '',
      age: '',
    });
  }


  return (
    <div>
      <form className="login_form">
          <div className="registration_input">
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
              <div className="nic_name_form">
                  <input
                      type="text"
                      name="nic_name"
                      placeholder="닉네임"
                      value={nic_name}
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
              <p></p>
              <div className="age_form">
                  <input
                      type="text"
                      name="age"
                      placeholder="나이"
                      value={age}
                      onChange={onChange}
                  ></input>
              </div>
          </div>
          <p></p>
          <button type="button" className="registration_button" onClick={registration}>가입하기</button>  
          {/* 양식 제출용이 아니라면 button type = "button" 으로 두면 된다. */}
      </form>
    </div>
  );
};

export default Registration_Form