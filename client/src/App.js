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
      axios.post("http://webmarker/users/logout");
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

{
  /* <Route path="/" element={<LoginPage />} />
        <Route path="mainpage" element={<MainPage />} /> */
}

{
  /* <Route path="userinfo" element={<UserInfoPage />} /> */
}

// {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// }
