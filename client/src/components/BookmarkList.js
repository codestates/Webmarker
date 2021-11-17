import Folder from "./Folder";
import AddFolder from "./AddFolder";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFolders } from "../actions/folder";

function BookmarkList() {
  const dispatch = useDispatch();
  const folders = useSelector((store) => store.folder.folders);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/bookmarks",
  //       {
  //         headers: {
  //           authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data.data.folders);
  //       const folders = response.data.data.folders;
  //       dispatch(setFolders(folders));
  //     })
  //     .catch((err) => {});
  // }, [dispatch]);

  useEffect(() => {
    const response = {
      data: {
        data: {
          folders: [
            {
              id: 1,
              name: "folder-01",
              userId: 1,
              Bookmarks: [
                {
                  id: 1,
                  name: "NAVER!",
                  url: "www.naver.com",
                  content: "세상의 모든 지식",
                  createdAt: "2021-11-15T17:29:37.000Z",
                  updatedAt: "2021-11-15T17:29:37.000Z",
                  Tags: [
                    {
                      id: 1,
                      name: "exciting",
                      createdAt: "2021-11-15T17:37:56.000Z",
                      updatedAt: "2021-11-15T17:37:56.000Z",
                    },
                  ],
                },
                {
                  id: 2,
                  name: "Google!",
                  url: "www.google.com",
                  content: "구글은 신이다",
                  createdAt: "2021-11-15T17:29:37.000Z",
                  updatedAt: "2021-11-15T17:29:37.000Z",
                  Tags: [
                    {
                      id: 3,
                      name: "running",
                      createdAt: "2021-11-15T17:37:56.000Z",
                      updatedAt: "2021-11-15T17:37:56.000Z",
                    },
                  ],
                },
              ],
            },
            {
              id: 2,
              name: "folder-02",
              userId: 1,
              Bookmarks: [
                {
                  id: 3,
                  name: "Daum!",
                  url: "www.daum.net",
                  content: "다음은 다음에",
                  createdAt: "2021-11-15T17:29:37.000Z",
                  updatedAt: "2021-11-15T17:29:37.000Z",
                  Tags: [
                    {
                      id: 2,
                      name: "shouting",
                      createdAt: "2021-11-15T17:37:56.000Z",
                      updatedAt: "2021-11-15T17:37:56.000Z",
                    },
                  ],
                },
              ],
            },
          ],
        },
        message: "Succeed Getting User's Bookmark Information",
      },
    };
    const folders = response.data.data.folders;
    dispatch(setFolders(folders));
  }, [dispatch]);

  return (
    <section id="bookmark-list-wrapper">
      <div id="bookmark-title">Bookmark List</div>
      {folders.map((folder) => (
        <Folder
          id={folder.id}
          name={folder.name}
          userId={folder.userId}
          bookmarks={folder.Bookmarks}
        />
      ))}
      <AddFolder />
    </section>
  );
}

export default BookmarkList;
