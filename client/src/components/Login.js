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
      .post("https://server.webmarker.link/users/login", {
        email: loginInfo.email,
        password: loginInfo.password,
      })
      .then((res) => {
        window.localStorage.setItem("token", res.data.data.accessToken);
        dispatch(loginChange());
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
      });
  };

  const socialLoginHandler = () => {
    window.location.assign("https://server.webmarker.link/users/auth/google");
    window.localStorage.setItem("token", document.cookie.accessToken);
    dispatch(loginChange());
  };
  //ouath 로그인 요청 함수

  return (
    <center>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="email"
            placeholder="email"
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
          <img
            id="oauth-logo"
            src="https://media.discordapp.net/attachments/907157959333785630/910685960612765786/google_logo.png"
          />
          <div onClick={socialLoginHandler} className="login-text">
            구글아이디로 로그인
          </div>
        </div>
        <div className="login-text-wrapper">
          <Link to="/signup">
            <span className="login-text">아이디가 없으신가요?</span>
          </Link>
        </div>
      </div>
    </center>
  );
}
