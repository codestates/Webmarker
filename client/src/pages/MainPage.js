import React from "react";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import BookmarkList from "../components/BookmarkList";
import BookmarkInfo from "../components/BookmarkInfo";
import AddBookmarkInfo from "../components/AddBookmarkInfo";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function MainPage() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <section>
      <div id="title-bar">
        <Link className="link" to="/">
          <img
            id="main-title-logo"
            src="https://media.discordapp.net/attachments/907157959333785630/908585503857713202/WebMarker_logo_proto_titlewhite.png"
          />
        </Link>
        <Link className="link" to="/userinfo">
          <span id="mypage-text">마이페이지</span>
        </Link>
        <Search setSearchInput={setSearchInput} />
      </div>
      <center id="mainpage-wrapper">
        <BookmarkList />
        <AddBookmarkInfo />
      </center>
      <Footer />
    </section>
  );
}

export default MainPage;
