export default function validate({ id, password }) {
    const errors = {};

    if (!id) {
        errors.id = "아이디가 입력되지 않았습니다.";
    }
    else if (id.length < 5) {
        errors.id = "5자 이상의 아이디를 사용해야 합니다."
    }

    if (!password) {
        errors.password = "비밀번호가 입력되지 않았습니다."
    }
    else if (password.length < 5) {
        errors.id = "5자 이상의 비밀번호를 사용해야 합니다."
    }
    
    return errors;
}