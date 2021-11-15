import Bookmark from "./Bookmark";
import { useState, useEffect } from "react";
import AddBookmark from "./AddBookmark";
import { useSelector } from "react-redux";

function Folder() {
  const bookmarks = useSelector((store) => store.bookmark.bookmarks);

  return (
    <section className="folder-wrapper">
      {bookmarks.length === 0 ? (
        <span>저장된 북마크가 없습니다.</span>
      ) : (
        <div className="single-folder">
          Foldername
          {bookmarks.map((item) => (
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
