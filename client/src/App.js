import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />   
        {/* <Route path="/"></Route>
        <Route path="/"></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
