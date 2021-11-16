import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import axios from "axios";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handlLoginState = (value) => {
    setIsLogin(value);
    if (value === false) {
      axios.post(
        "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com//users/logout"
      );
      localStorage.removeItem("token");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignUpPage />} />
        {isLogin ? (
          <Route
            path="/"
            element={<MainPage handlLoginState={handlLoginState} />}
          />
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

// {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// }
