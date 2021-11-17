import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { loginChange, logoutChange } from "../actions/loginChange";
import { useDispatch, useSelector } from "react-redux";

axios.defaults.withCredentials = true;

export default function Login() {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleLoginInfo = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    window.localStorage.setItem("email", loginInfo.email);
    window.localStorage.setItem("password", loginInfo.password);
    axios
      .post(
        "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/users/login",
        { email: loginInfo.email, password: loginInfo.password }
      )
      .then((res) => {
        window.localStorage.setItem("token", res.data.data.accessToken);
        dispatch(loginChange());
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
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
            onChange={handleLoginInfo("email")}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            className="login-box"
            onChange={handleLoginInfo("password")}
          ></input>
        </div>
        <div>
          <button id="login-btn" onClick={handleLogin}>
            로그인
          </button>
        </div>
        {isError ? <div className="invalid-feedback">{errorMessage}</div> : ""}
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
