import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
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
            onChange={() => handleInputValue("email")}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            onChange={handleInputValue("password")}
          ></input>
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
      <div>
        <Link to="/signup">
          <div classNAme="login-text">아이디가 없으신가요?</div>
        </Link>
        <div classNAme="login-text">비밀번호를 잊어버리셨나요?</div>
      </div>
    </center>
  );
}
