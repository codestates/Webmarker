import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditUser from "../components/EditUser";

axios.defaults.withCredentials = true;

function UserInfoPage() {
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
    <center>
      <div>WebMarker 회원정보</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <span>email 정보 표기</span>
        </div>
        <div>
          <input type="password" placeholder="현재 password"></input>
        </div>
        <div>
          <button onClick={checkPassword}>비밀번호확인</button>
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
  );
}

export default UserInfoPage;
