import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function EditUser({ handlePassword, handleChangePassowrd }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <input
          className="userinfo-password-box"
          type="password"
          placeholder="변경할 Password"
          onChange={handlePassword("newPassword")}
        ></input>
      </div>
      <div>
        <input
          className="userinfo-password-box"
          type="password"
          placeholder="변경할 Password 확인"
          onChange={handlePassword("newPasswordCheck")}
        ></input>
      </div>
      <div>
        <button className="userifn-btn" onClick={handleChangePassowrd}>
          비밀번호변경
        </button>
      </div>
    </form>
  );
}
