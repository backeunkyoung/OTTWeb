import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

let overlap = false;

const Registration_Form = (props) => {
  const [form, setForm] = useState({    // 상태 관리를 할 데이터(바인딩 해야 할 데이터)
    id: '',
    pw: '',
    nic_name: '',
    age: '',
  });

  const { id, pw , nic_name, age } = form;

  // close={ closeModal }
  const { close } = props;

  // 데이터 바인딩을 위한 이벤트(단방향 바인딩 => 리액트는 양방향 바인딩 제공 X)
  const onChange = (e) => {
    console.log("overlap : " + overlap);
    if (e.target.name === "id") {
        overlap = false;
    }
    const nextForm = {
        ...form, //기존의 form내용을 복사
        [e.target.name]: e.target.value, // input에 입력한 값으로 재설정해줌
    };
    setForm(nextForm);  // 상태 값 갱신
  };


  // '중복체크' 버튼 클릭 이벤트 => 서버를 통해 DB에서 ID를 조회한 후, 사용 가능한지 판별
  const overlapCheck = () => {
    alert("중복체크 클릭");

    var url = "/overlapCheck";

    axios.post( url, {
        postId : id
    })
    .then(function (response) {
        // 여기서 받아온 response는 JSON 타입
        // console.log(JSON.stringify(response));

        if (response.data.msg === "success") {
            msg_print(response.data.msg);
            overlap = true;
            console.log("중복체크 success => overlap : " + overlap);
        }
        else if (response.data.msg === "id_fail") {
            msg_print(response.data.msg);
        }
    })  // 실패시 catch 진행
    .catch(function (error) {
        alert("error발생 => " + error);
    })
  }


  // ID 중복 체크 결과 메시지를 화면에 붙여넣기(DOM 이용)
  function msg_print(msg) {
    var element = '';
    if (msg === "success") {
        element = "사용 가능한 ID";
    }
    else if (msg === "id_fail") {
        element = "중복된 ID";
    }
    ReactDOM.render(element, document.getElementById('id_msg'));
  }


  // 회원가입 페이지의 필요조건을 충족했는지 여부를 리턴
  function NecessaryCondition_Check() {
    if (overlap === false) {
        return "overlap_no";
    }
    else if (id === '' || nic_name === '' || pw === '' || age === '') {
        return "input_no";
    }
    else {
        return "completion";
    }
  }


  const registration = () => {
    console.log("가입하기 클릭 시점의 overlap : " + overlap);

    var NC = NecessaryCondition_Check(); // 필요조건 충족 확인
    if (NC === "completion") {
        var url = "/registration";

        axios.post( url, {  // 서버로 post방식으로 데이터 전달
            postId : id,
            postPw : pw,
            postNicName : nic_name,
            postAge : age
        })  // 성공시 then 진행
        .then(function (response) {
            // 여기서 받아온 response는 JSON 타입
            // console.log(JSON.stringify(response));

            if (response.data.msg === "success") {
                alert("가입 완료");
                document.getElementById('closeModal').click();
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
            pw: '',
            nic_name: '',
            age: '',
        });

    }   // 필요조건 미충족 시 화면에 메세지 출력
    else if (NC === "overlap_no") {
        alert("중복체크 안함");
        let element = "ID 중복체크를 해주세요";
        ReactDOM.render(element, document.getElementById('nocheck_msg'));
    }
    else if (NC === "input_no") {
        alert("정보 입력 모두 안함");
        let element = "입력하지 않은 정보가 있습니다.";
        ReactDOM.render(element, document.getElementById('nocheck_msg'));
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
                    disabled={!id}
                    id = 'overlapCheck_Button'
                    onClick={overlapCheck}
                    onChange={onChange}
                  >
                      중복체크
                  </button>
              </div>
              <div id="id_msg"></div>
                  
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

          <br></br>
          <button type="button" id="registration_button" onClick={registration}>가입하기</button>  
          {/* 양식 제출용이 아니라면 button type = "button" 으로 두면 된다. */}
          <p></p>
          <div id="nocheck_msg">
          </div>
        </form>
        <button type="hidden" id="closeModal" onClick={close}></button>
    </div>
  );
}

export default Registration_Form