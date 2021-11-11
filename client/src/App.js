import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="mainpage" element={<MainPage />} />   
        {/* <Route path="/"></Route>
        <Route path="/"></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
