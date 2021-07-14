import React from 'react';
import useForm from '../useForm';
import validate from "../validate";
import "../../App.css";

function LoginPageForm () {
    const {
        values,
        errors,
        submitting,
        handleChange,
        handleSubmit
    } = useForm({ initialValues : { id : "", password : ""},
                    onSubmit : (values) => {
                        alert(JSON.stringify(values, null, 2));
                    },
                    validate,
                });

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate>
                <fieldset className="login_form">
                    <legend className="blind">로그인</legend>
                    
                    <div className="id_area">
                        <label className="label_id">
                        <input
                            type="text"
                            id="id"
                            name="id"
                            placeholder="아이디"
                            value={values.id}
                            onChange={handleChange}
                            className={errors.id && "errorInput"}
                        ></input>
                        </label>
                        {errors.email && <span className="errorMessage">{errors.email}</span>}
                    </div>
                    <div className="pw_area">
                        <label className="label_pw">
                        <input
                            type="password"
                            id="pw"
                            name="pw"
                            placeholder="비밀번호"
                            value={values.password}
                            onChange={handleChange}
                            className={errors.id && "errorInput"}
                        ></input>
                        </label>
                        {errors.password && (<span className="errorMessage">{errors.password}</span>)}
                    </div>
                    <input type="submit" disabled={submitting} value="로그인" className="loginButton"></input>
                </fieldset>
                <br></br>
            </form>
            <div className="find_info">
                <a href="/" target="_blank" className="idinquiry">아이디 찾기</a>
                <span className="bar" aria-hidden="true">|</span>

                <a href="/" target="_blank" className="pwinquiry">비밀번호 찾기</a>
                <span className="bar" aria-hidden="true">|</span>

                <a href="/" target="_blank" className="join">회원가입</a>
            </div>
        </div>
    )
}

export default LoginPageForm;