import React from "react";
import { useState, useEffect } from "react";
import BookmarkList from "../components/BookmarkList";
import BookmarkInfo from "../components/BookmarkInfo";
import AddBookmarkInfo from "../components/AddBookmarkInfo";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import UserInfo from "../components/UserInfo";

function MainPage({ handlLoginState }) {
  const [onMyPage, setOnMyPage] = useState(false);
  const handleOnMyPage = (value) => {
    setOnMyPage(value);
  };

  return (
    <section>
      <Nav handleOnMyPage={handleOnMyPage} handlLoginState={handlLoginState} />
      {onMyPage ? (
        <UserInfo handleOnMyPage={handleOnMyPage} />
      ) : (
        <center id="mainpage-wrapper">
          <BookmarkList />
          <AddBookmarkInfo />
        </center>
      )}
      <Footer />
    </section>
  );
}

export default MainPage;
