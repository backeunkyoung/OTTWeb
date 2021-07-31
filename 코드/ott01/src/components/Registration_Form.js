import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Registration_Form = () => {
  const [form, setForm] = useState({
    id: '',
    nic_name: '',
    pw: '',
    age: '',
  });

  const [disable, setDisable] = React.useState(true);

  const { id, nic_name, pw , age } = form;

  const onChange = (e) => {
    // document.getElementById("overlapCheck_Button").disabled = false;
    setDisable(false);
    const nextForm = {
        ...form, //기존의 form내용을 복사
        [e.target.name]: e.target.value, // 원하는 값을 덮어 씌운다
    };
    setForm(nextForm);
    // if (nextForm === '') {
    //     document.getElementById("overlapCheck_Button").disabled = true;
    // }
  };

  function msg_print(msg) { // ID 중복 체크 메시지 출력
    var element = '';
    if (msg == "success") {
        element = "사용 가능한 ID";
    }
    else if (msg == "id_fail") {
        element = "중복된 ID";
    }
    ReactDOM.render(element, document.getElementById('id_msg'));
  }

  function overlap_NoCheck() {
    if (id === '' || nic_name === '' || pw === '' || age === '') {
        var element = "입력하지 않은 정보가 있습니다."
        ReactDOM.render(element, document.getElementById('nocheck_msg'));
        return "No";
    }
    else {
        return "Ok";
    }
  }

  const overlapCheck = () => {
    alert("id 중복 체크 중");
    var url = "/overlapCheck";

    axios.post( url, {
    postId : id
    })
    .then(function (response) {
        // 여기서 받아온 response는 JSON 타입
        console.log(JSON.stringify(response));

        if (response.data.msg === "success") {
            msg_print(response.data.msg);
        }
        else if (response.data.msg === "id_fail") {
            msg_print(response.data.msg);
        }
    })  // 실패시 catch 진행
    .catch(function (error) {
        alert("error발생 => " + error);
    })
  }

  const registration = () => {
    alert("회원가입 클릭 함\nid : " + id + " , nic_name : " + nic_name + ", pw : " + pw + ", age : " + age);
    
    var go = overlap_NoCheck();
    if (go === "Ok") {
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
                alert("가입 완료");
            }
            else if (response.data.msg === "id_fail") {
                alert("가입 실패");
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
                  &nbsp;
                  <button
                    type="button"
                    disabled={disable}
                    id = 'overlapCheck_Button'
                    onClick={overlapCheck}
                  >
                      중복체크
                  </button>
              </div>
              <div id="id_msg">
                  
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
          <button type="button" id="registration_button" onClick={registration}>가입하기</button>  
          {/* 양식 제출용이 아니라면 button type = "button" 으로 두면 된다. */}
          <p></p>
          <div id="nocheck_msg">
          </div>
        </form>
    </div>
  );
}

export default Registration_Form