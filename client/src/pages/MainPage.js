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
      .get(
        "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/users/userinfo",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setUserId(res.data.data.email);
      });
  };

  return (
    <section>
      <Nav handleOnMyPage={handleOnMyPage} />
      {onMyPage ? (
        <UserInfo handleOnMyPage={handleOnMyPage} userId={userId} />
      ) : (
        <center id="mainpage-wrapper">
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
