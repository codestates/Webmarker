import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import UserInfoPage from "./pages/UserInfoPage";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handlLoginState = () => {
    setIsLogin(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="userinfo" element={<UserInfoPage />} />
        {isLogin ? (
          <Route path="/" element={<MainPage />} />
        ) : (
          <Route
            path="/"
            element={<LoginPage handlLoginState={handlLoginState} />}
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;

{
  /* <Route path="/"
          {isLogin ? <Redirect to="/mypage" /> : <Redirect to="/login" />} > */
}
{
  /* <Route path="/" element={<LoginPage />} />
        <Route path="mainpage" element={<MainPage />} /> */
}
