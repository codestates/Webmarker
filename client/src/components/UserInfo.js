import React, { useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";

axios.defaults.withCredentials = true;

function UserInfoPage({ handleOnMyPage, userId }) {
  const [newPassword, setPassword] = useState({
    password: "",
    newPassword: "",
    newPasswordCheck: "",
  });
  const [errorCheck, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageCheck, setErrorMessageCheck] = useState(false);

  const handlePassword = (key) => (e) => {
    setPassword({ ...newPassword, [key]: e.target.value });
    console.log(newPassword.newPassword);
  };
  //회원가입 정보를 변경하는 함수

  const checkPassword = () => {
    axios
      .get(
        `https://server.webmarker.link/users/password/${newPassword.password}`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.data.result) {
          setErrorMessageCheck(false);
          setError(res.data.data.result);
        } else {
          setErrorMessageCheck(true);
          setErrorMessage("비밀번호가 일치하지 않습니다");
        }
      });
  };
  //패스워드 체크하는 함수

  const handleChangePassowrd = () => {
    if (newPassword.newPassword === newPassword.newPasswordCheck) {
      axios
        .patch(
          "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/users/password",
          { password: newPassword.newPassword },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert("비밀번호가 성공적으로 변경되었습니다");
          setErrorMessageCheck(false);
          setError(false);
        });
    } else {
      setErrorMessageCheck(true);
      setErrorMessage("비밀번호가 일치하지 않습니다");
    }
  };
  //비밀번호 변경 요청하는 함수

  return (
    <section id="userinfo-page-wrapper">
      <div id="userinfo-wrapper">
        <center>
          <div id="userinfo-title">WebMarker 회원정보</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="userinfo-box">{userId}</div>
            <div>
              <input
                className="userinfo-password-box"
                type="password"
                placeholder="현재 password"
                onChange={handlePassword("password")}
              ></input>
            </div>
            <div>
              <button className="userinfo-btn" onClick={checkPassword}>
                비밀번호확인
              </button>
              <button
                className="userinfo-btn"
                onClick={() => handleOnMyPage(false)}
              >
                뒤로
              </button>
            </div>
          </form>
          {errorCheck ? (
            <EditUser
              errorMessageCheck={errorMessageCheck}
              handlePassword={handlePassword}
              handleChangePassowrd={handleChangePassowrd}
            />
          ) : (
            ""
          )}
          {errorMessageCheck ? (
            <div className="invalid-feedback">{errorMessage}</div>
          ) : (
            ""
          )}
        </center>
      </div>
    </section>
  );
}

export default UserInfoPage;
