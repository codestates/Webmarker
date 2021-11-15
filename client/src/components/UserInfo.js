import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditUser from "./EditUser";
import Nav from "./Nav";
import Footer from "./Footer";

axios.defaults.withCredentials = true;

function UserInfoPage({ handleOnMyPage }) {
  // const [userInfo, setUserInfo] = useState("")
  const [newPassword, setPassword] = useState({
    newPassword: "",
    newPasswordCheck: "",
  });
  // const [passwordCheck, setPasswordCheck] = useState(false);
  const [errorCheck, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePassword = (key) => (e) => {
    setPassword({ ...newPassword, [key]: e.target.value });
  };
  //회원가입 정보를 변경하는 함수

  const checkPassword = () => {
    setError(true);
    // axios.get("endpoint").then(res => setError(res.body))
  };
  //패스워드 체크하는 함수

  const handleChangePassowrd = () => {
    if (newPassword.newPassword === newPassword.newPasswordCheck) {
      axios.get("http://webmarker/user/userinfo").then(() => {
        console.log("비밀번호 변경 성공!");
      });
    } else {
      setErrorMessage("비밀번호가 일치하지 않습니다");
    }
  };
  //비밀번호 변경 요청하는 함수

  return (
    <section>
      <div id="userinfo-wrapper">
        <center>
          <div id="userinfo-title">WebMarker 회원정보</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="userinfo-box">webmarker@gmail.com</div>
            <div>
              <input
                className="userinfo-password-box"
                type="password"
                placeholder="현재 password"
              ></input>
            </div>
            <div>
              <button className="userifn-btn" onClick={checkPassword}>
                비밀번호확인
              </button>
              <button
                className="userifn-btn"
                onClick={() => handleOnMyPage(false)}
              >
                뒤로
              </button>
            </div>
          </form>
          {errorCheck ? (
            <EditUser
              handlePassword={handlePassword}
              handleChangePassowrd={handleChangePassowrd}
            />
          ) : (
            ""
          )}
          {errorCheck ? <div>{errorMessage}</div> : ""}
        </center>
      </div>
    </section>
  );
}

export default UserInfoPage;
