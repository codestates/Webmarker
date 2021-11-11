import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

function SignUpPage() {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

  const handleSignUpValue = (key) => (e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    console.log(signUpInfo.password);
    console.log(signUpInfo.passwordCheck);
  };
  //회원가입 정보를 변경하는 함수

  const passwordMatchConfirm = () => {
    if (signUpInfo.password === signUpInfo.passwordCheck) {
      return true;
    } else {
      return false;
    }
  };
  //비밀번호 일치여부 판단하는 함수

  const renderFeedbackMessage = () => {
    if (!passwordMatchConfirm()) {
      return (
        <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
      );
    }
  };
  //오류메세지를 렌더하는 함수

  const handleSignUp = () => {
    if (signUpInfo.password === signUpInfo.passwordCheck) {
      console.log("회원가입 성공!");
      axios
        .post("http://webmarker/user/login", {
          email: signUpInfo.id,
          password: signUpInfo.password,
        })
        .then(() => {
          console.log("회원가입 성공!");
        });
    }
  };
  //회원가입 서버에 요청하는 함수

  return (
    <center>
      <div>WebMarker 회원가입</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="email"
            placeholder="username"
            onChange={handleSignUpValue("email")}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            onChange={handleSignUpValue("password")}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="password 확인"
            onChange={handleSignUpValue("passwordCheck")}
          ></input>
          {renderFeedbackMessage()}
        </div>
        <div>
          <button onClick={handleSignUp}>회원가입</button>
          <Link to="/">
            <button onClick={handleSignUp}>홈으로</button>
          </Link>
        </div>
      </form>
    </center>
  );
}

export default SignUpPage;

//   const [error, setError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const [signUpId, setSignUpId] = useState("");
//   const [signUpPw, setSignUpPw] = useState("");
//   const [signUpPwCheck, setSignUpPwCheck] = useState("");

//   const handleIdValue = (e) => {
//     setSignUpId(e.target.value);
//   };

//   const handlePwValue = (e) => {
//     console.log(e.target.value);
//     setSignUpPw(e.target.value);
//   };

// let pw = JSON.parse(JSON.stringify(signUpInfo.password));
// let pwCheck = JSON.parse(JSON.stringify(signUpInfo.passwordCheck));4

//   const handlePwCheckValue = (e) => {
//     setSignUpPwCheck(e.target.value);
//     console.log(signUpPwCheck);

//     if (signUpPw === signUpPwCheck) {
//       setError(false);
//       setErrorMessage("");
//     } else {
//       setError(true);
//       setErrorMessage("비밀번호가 일치하지 않습니다");
//     }
//   };

{
  /* {error ? <div> {errorMessage} </div> : ""} */
}
