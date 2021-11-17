import Bookmark from "./Bookmark";
import { useState, useEffect } from "react";
import AddBookmark from "./AddBookmark";
import { useSelector } from "react-redux";
import Axios from "axios";

function Folder({ id, name, userId, bookmarks }) {
  const { keyword, filterType } = useSelector((store) => store.bookmark);
  const filteredBookmarks =
    keyword === null
      ? bookmarks
      : bookmarks.filter((bookmark) => {
          const searchValue = bookmark[filterType];
          if (
            typeof searchValue !== "string" &&
            !(searchValue instanceof Array)
          )
            return bookmarks;

          if (searchValue instanceof Array) {
            return searchValue[0].name.includes(keyword);
          }
          return searchValue.includes(keyword);
        });

  const removeFolder = () => {};
  Axios.delete(
    "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/folders",
    {
      id: id,
    },
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  ).then(() => {
    alert("삭제 완료!");
    // getFolders();
  });

  return (
    <section className="folder-wrapper">
      {filteredBookmarks.length === 0 ? (
        <span>저장된 북마크가 없습니다.</span>
      ) : (
        <div className="single-folder">
          {name}
          <button className="submit-button" onClick={removeFolder}>
            삭제
          </button>
          {filteredBookmarks.map((item) => (
            <Bookmark id={item.id} title={item.name} />
          ))}
        </div>
      )}
      <div>
        <AddBookmark id={id} />
      </div>
    </section>
  );
}

export default Folder;
