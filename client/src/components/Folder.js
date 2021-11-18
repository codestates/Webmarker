import Bookmark from "./Bookmark";
import { useState, useEffect } from "react";
import AddBookmark from "./AddBookmark";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import axios from "axios";
import { setFolders } from "../actions/folder";

function Folder({ id, name, userId, bookmarks }) {
  const { keyword, filterType, isMoveMode, selectBookmarkId } = useSelector(
    (store) => ({
      keyword: store.bookmark.keyword,
      selectBookmarkId: store.bookmark.selectBookmarkId,
      filterType: store.bookmark.filterType,
      isMoveMode: store.bookmark.isMoveMode,
    })
  );

  const dispatch = useDispatch();

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
            const findValue = searchValue.find((item) => item.name === keyword);
            return findValue !== undefined;
          }
          return searchValue.includes(keyword);
        });

  const fetchFolders = () => {
    axios
      .get(
        "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/bookmarks",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        const folders = response.data.data.folders;
        dispatch(setFolders(folders));
      });
  };

  const removeFolder = () => {
    Axios.delete(
      `http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/folders/${id}`,

      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then(() => {
      alert("삭제 완료!");
      fetchFolders();
    });
  };

  const moveBookmark = () => {
    axios
      .patch(
        `http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/bookmarks/${selectBookmarkId}`,
        {
          folderId: id,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        alert("이동 완료");
        fetchFolders();
      });
  };

  return (
    <section className="folder-wrapper">
      {isMoveMode ? (
        <div className="background" onClick={moveBookmark} />
      ) : null}
      <div className="single-folder">
        {name}
        <button className="delete-btn" onClick={removeFolder}>
          삭제
        </button>
      </div>
      {filteredBookmarks.length === 0 ? (
        <span>저장된 북마크가 없습니다.</span>
      ) : (
        <div className="single-folder">
          <div className="folder-name-wrapper">
            <div className="folder-name">{name}</div>
            <button className="delete-btn" onClick={removeFolder}>
              X
            </button>
          </div>
          {filteredBookmarks.map((item) => (
            <Bookmark id={item.id} title={item.name} url={item.url} />
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
