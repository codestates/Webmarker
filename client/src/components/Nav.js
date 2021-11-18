import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBookmark, filterType } from "../actions/selectBookmark";
import Search from "../components/Search";
import SelectBox from "./SelectBox";
import axios from "axios";
import { logoutChange } from "../actions/loginChange";

export default function Nav({ handleOnMyPage }) {
  const dispatch = useDispatch();
  const options = [
    {
      name: "타이틀",
      value: "name",
    },
    {
      name: "태그",
      value: "Tags",
    },
  ];

  const searchHandler = (keyword) => {
    if (keyword.length === 0) {
      dispatch(filterBookmark(null));
      return;
    }
    dispatch(filterBookmark(keyword));
  };

  const selectHandler = (value) => {
    dispatch(filterType(value));
  };

  const handleLogout = () => {
    dispatch(logoutChange());
    axios.post("https://server.webmarker.link//users/logout", {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("password");
    //로컬스토리지에서 토큰, 아이디, 비밀번호삭제
  };
  //로그아웃 실행함수

  return (
    <div id="title-bar">
      <div>
        <img
          id="main-title-logo"
          src="https://media.discordapp.net/attachments/907157959333785630/908585503857713202/WebMarker_logo_proto_titlewhite.png"
          onClick={() => handleOnMyPage(false)}
        />
        <SelectBox options={options} onSelect={selectHandler} />
        <Search
          onSearch={searchHandler}
          onReset={() => {
            searchHandler("");
          }}
        />
      </div>
      <div>
        <div className="mypage-text" onClick={() => handleOnMyPage(true)}>
          마이페이지
        </div>
        <div className="mypage-text" onClick={handleLogout}>
          로그아웃
        </div>
      </div>
    </div>
  );
}
