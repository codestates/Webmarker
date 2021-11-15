import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handlerLoginInfo = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = () => {
    axios
      .post("http://webmarker/user/login", {
        email: loginInfo.email,
        password: loginInfo.password,
      })
      .then(() => {
        console.log("로그인 성공!");
      });
  };

  return (
    <center>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="email"
            placeholder="username"
            className="login-box"
            onChange={handlerLoginInfo}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            className="login-box"
            onChange={handlerLoginInfo}
          ></input>
        </div>
        <div>
          <button id="login-btn" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </form>
      <div className="login-text-section">
        <div className="login-text-wrapper">
          <Link to="/signup">
            <span className="login-text">아이디가 없으신가요?</span>
          </Link>
        </div>
        <div className="login-text-wrapper">
          <span className="login-text">비밀번호를 잊어버리셨나요?</span>
        </div>
      </div>
    </center>
  );
}
