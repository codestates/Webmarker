import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import UserInfoPage from "./pages/UserInfoPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="mainpage" element={<MainPage />} />
        <Route path="userinfo" element={<UserInfoPage />} />
        {/* <Route path='/'>
          {isLogin ? <Redirect to='/mypage' /> : <Redirect to='/login' />}
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
