import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBookmark, filterType } from "../actions/selectBookmark";
import Search from "../components/Search";
import SelectBox from "./SelectBox";

export default function Nav({ handleOnMyPage, handlLoginState }) {
  const dispatch = useDispatch();
  const options = [
    {
      name: "타이틀",
      value: "title",
    },
    {
      name: "태그",
      value: "tag",
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

  // const resetHandler = () =>

  return (
    <div id="title-bar">
      <div>
        <img
          id="main-title-logo"
          src="https://media.discordapp.net/attachments/907157959333785630/908585503857713202/WebMarker_logo_proto_titlewhite.png"
          onClick={() => handleOnMyPage(false)}
        />
        <SelectBox options={options} onSelect={selectHandler} />
        <Search onSearch={searchHandler} />
      </div>
      <div>
        <div className="mypage-text" onClick={() => handleOnMyPage(true)}>
          마이페이지
        </div>
        <div className="mypage-text" onClick={() => handleOnMyPage(false)}>
          로그아웃
        </div>
      </div>
    </div>
  );
}
