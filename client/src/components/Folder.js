import Bookmark from "./Bookmark";
import { useState, useEffect } from "react";
import AddBookmark from "./AddBookmark";
import { useSelector } from "react-redux";

function Folder() {
  const { bookmarks, keyword, filterType } = useSelector(
    (store) => store.bookmark
  );

  const filteredBookmarks =
    keyword === null
      ? bookmarks
      : bookmarks.filter((bookmark) => {
          const searchKeyword = bookmark[filterType];
          if (typeof searchKeyword !== "string") return bookmarks;
          return searchKeyword.includes(keyword);
        });

  return (
    <section className="folder-wrapper">
      {bookmarks.length === 0 ? (
        <span>저장된 북마크가 없습니다.</span>
      ) : (
        <div className="single-folder">
          Foldername
          {filteredBookmarks.map((item) => (
            <Bookmark id={item.id} title={item.title} />
          ))}
        </div>
      )}
      <div>
        <AddBookmark />
      </div>
    </section>
  );
}

export default Folder;
