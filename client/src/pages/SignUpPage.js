import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

axios.defaults.withCredentials = true;

function SignUpPage() {
  let navigate = useNavigate();

  function comeBackHome() {
    navigate("/");
  }

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
        .post("http://webmarker/user/signup", {
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
    <center id="signup-wrapper">
      <div id="signup-title">WebMarker 회원가입</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            className="signup-box"
            type="email"
            placeholder="username"
            onChange={handleSignUpValue("email")}
          ></input>
        </div>
        <div>
          <input
            className="signup-box"
            type="password"
            placeholder="password"
            onChange={handleSignUpValue("password")}
          ></input>
        </div>
        <div>
          <input
            className="signup-box"
            type="password"
            placeholder="password 확인"
            onChange={handleSignUpValue("passwordCheck")}
          ></input>
          {renderFeedbackMessage()}
        </div>
        <div id="signup-btn-wrapper">
          <button className="signup-btn" onClick={handleSignUp}>
            회원가입
          </button>
          <button className="signup-btn" onClick={comeBackHome}>
            홈으로
          </button>
        </div>
      </form>
      <Footer />
    </center>
  );
}

export default SignUpPage;
