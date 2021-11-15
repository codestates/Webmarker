import React, { useState } from "react";
import Search from "../components/Search";

export default function EditUser({ handleOnMyPage, handlLoginState }) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div id="title-bar">
      <img
        id="main-title-logo"
        src="https://media.discordapp.net/attachments/907157959333785630/908585503857713202/WebMarker_logo_proto_titlewhite.png"
        onClick={() => handleOnMyPage(false)}
      />
      <span id="maypage-text-wrapper">
        <span className="mypage-text" onClick={() => handleOnMyPage(true)}>
          마이페이지
        </span>
        <span className="mypage-text" onClick={() => handlLoginState(false)}>
          로그아웃
        </span>
      </span>
      <Search setSearchInput={setSearchInput} />
    </div>
  );
}
