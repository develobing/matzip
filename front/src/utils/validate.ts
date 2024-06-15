type UserInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  // 이메일 유효성 검사
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegExp.test(values.email)) {
    errors.email = '이메일 형식이 아닙니다';
  }

  // 비밀번호 유효성 검사
  if (values.password.length < 8 || values.password.length > 20) {
    errors.password = '비밀번호는 8자 이상 20자 이하로 입력하세요';
  }

  return errors;
}

function validateLogin(values: UserInformation) {
  return validateUser(values);
}

function validateSignup(values: UserInformation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  // 비밀번호 확인 유효성 검사
  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
  }

  return signupErrors;
}

export {validateLogin, validateSignup};
