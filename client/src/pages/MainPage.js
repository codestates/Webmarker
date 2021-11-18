import React from "react";
import { useState, useEffect } from "react";
import BookmarkList from "../components/BookmarkList";
import BookmarkInfo from "../components/BookmarkInfo";
import AddBookmarkInfo from "../components/AddBookmarkInfo";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import UserInfo from "../components/UserInfo";
import axios from "axios";

function MainPage() {
  const [onMyPage, setOnMyPage] = useState(false);
  const [userId, setUserId] = useState("");
  const handleOnMyPage = (value) => {
    setOnMyPage(value);
    axios
      .get("https://server.webmarker.link/users/userinfo", {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserId(res.data.data.email);
      });
  };
  //회원정보 불러오는 함수

  return (
    <section id="main-page-wrapper">
      <Nav handleOnMyPage={handleOnMyPage} />
      {onMyPage ? (
        <UserInfo handleOnMyPage={handleOnMyPage} userId={userId} />
      ) : (
        <center id="table-wrapper">
          <BookmarkList />
          <AddBookmarkInfo />
        </center>
      )}
      <section id="footer-position">
        <Footer />
      </section>
    </section>
  );
}

export default MainPage;
