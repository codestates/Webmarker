import React from "react";
import Login from "../components/Login";
import Footer from "../components/Footer";

function LoginPage() {
  return (
    <div id="login-page-wrapper">
      <center id="login-page">
        <img
          id="login-logo"
          src="https://media.discordapp.net/attachments/907157959333785630/908518178777333800/WebMarker_logo_proto_resizePNG.png"
        />
      </center>
      <div>
        <Login />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LoginPage;
