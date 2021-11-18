import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { loginChange } from "./actions/loginChange";

axios.defaults.withCredentials = true;

function App() {
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const getAccessToken = () => {
    axios
      .post("https://server.webmarker.link/users/auth/sendToken", {})
      .then((res) => {
        window.localStorage.setItem("token", res.data.data.accessToken);
        dispatch(loginChange());
      });
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  const keepLogin = () => {
    if (
      window.localStorage.getItem("email") &&
      window.localStorage.getItem("password")
    ) {
      dispatch(loginChange());
    }
  };
  //로그인 유지를 위한 함수

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignUpPage />} />
        {loginState.login ? (
          <Route path="/" element={<MainPage />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

// {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// }
