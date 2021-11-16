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
  //루트페이지로 이동시키는 함수

  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });
  //회원가입을 위한 정보 상태

  const [isError, setIsError] = useState(false);
  //아이디가 이미 존재할 경우 에러상태 변경하여 조건부 렌더링

  const handleSignUpValue = (key) => (e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
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

  const idMatchConfirm = () => {
    setIsError(true);
  };
  //ID가 이미 존재할 경우 작동하는 함수

  const renderFeedbackMessage = () => {
    if (!passwordMatchConfirm()) {
      return (
        <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
      );
    }
  };
  //오류메세지를 렌더하는 함수

  const renderIdCheckMessage = () => {
    if (isError) {
      return <div className="invalid-feedback">이미 존재하는 아이디입니다</div>;
    }
  };
  //ID가 이미 존재할경우 아이디 입력칸 하단에 에러메시지 표시하는 함수

  const handleSignUp = () => {
    if (
      signUpInfo.password !== "" &&
      signUpInfo.passwordCheck !== "" &&
      signUpInfo.password === signUpInfo.passwordCheck
    ) {
      axios
        .post(
          "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/users/signup",
          {
            email: signUpInfo.email,
            password: signUpInfo.password,
          }
        )
        .then(() => {
          alert("회원가입 성공!");
          console.log("회원가입 성공!");
          comeBackHome();
        })
        .catch(() => idMatchConfirm());
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
          {renderIdCheckMessage()}
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
