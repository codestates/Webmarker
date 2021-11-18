import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";
import { moveBookmark, selectBookmark } from "../actions/selectBookmark";
import axios from "axios";
import { setFolders } from "../actions/folder";
import Tag from "./Tag";

function AddBookmarkInfo() {
  const dispatch = useDispatch();
  const selectBookmarkId = useSelector(
    (store) => store.bookmark.selectBookmarkId
  );
  const selectFolderId = useSelector((store) => store.folder.selectFolderId);
  const selectData =
    useSelector((store) => {
      const datas = store.folder.folders.map((folder) => {
        return folder.Bookmarks.find(
          (bookmark) => bookmark.id === selectBookmarkId
        );
      });

      const totalSelectData = datas.find((data) => data !== undefined);
      return totalSelectData;
    }) ?? null;

  // ?? 앞에 데이터의 값이 undefinde나 null 일때 ?? 뒤에 값을 가진다.

  const [isEditMode, setIsEditMode] = useState(false);
  const [bookmarkInfo, setBookmarkInfo] = useState({
    title: "",
    tag: [],
    url: "",
    contents: "",
  });

  const isViewMode = selectData !== null && !isEditMode;

  const getFolders = () => {
    axios
      .get("https://server.webmarker.link/bookmarks", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((response) => {
        const folder = response.data.data.folders;
        dispatch(setFolders(folder));
      })
      .catch((err) => {});
  };

  // 입력 버튼을 누르면 서버로 북마크 정보 전송
  const submitReview = () => {
    if (selectData !== null) {
      Axios.put(
        "https://server.webmarker.link/bookmarks",
        {
          id: selectBookmarkId.toString(),
          name: bookmarkInfo.title,
          url: bookmarkInfo.url,
          content: bookmarkInfo.contents,
          // tagName: bookmarkInfo.tag,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then(() => {
          alert("수정 완료!");
          getFolders();
        })
        .catch(() => {
          alert("수정 실패");
          getFolders();
        });
    }
    if (selectData === null) {
      Axios.post(
        "https://server.webmarker.link/bookmarks",
        {
          name: bookmarkInfo.title,
          tag: bookmarkInfo.tag,
          url: bookmarkInfo.url,
          content: bookmarkInfo.contents,
          folderId: selectFolderId.toString(),
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ).then(() => {
        alert("등록 완료!");
        getFolders();
      });
    }

    setBookmarkInfo({
      title: "",
      tag: [],
      url: "",
      contents: "",
    });
    return;
  };

  const bookmarkInfoHandler = (event) => {
    const { name, value } = event.target;
    setBookmarkInfo({ ...bookmarkInfo, [name]: value });
  };

  const contentHandler = (_, editor) => {
    //ckeditor는 onChange 되는 순서가 늦어서 setBookmarkInfo 함수에
    // ...bookmarkinfo 대신에 함수를 만들어서 prev를 넣어줌
    const data = editor.getData();
    setBookmarkInfo((prev) => ({
      ...prev,
      contents: data,
    }));
  };

  const setEditMode = () => {
    setIsEditMode(true);
    dispatch(moveBookmark(false));
  };

  const closeEdit = () => {
    setIsEditMode(false);
    dispatch(selectBookmark(null));

    dispatch(moveBookmark(false));
    setBookmarkInfo({
      ...bookmarkInfo,
    });
  };
  const removeBookmark = () => {
    Axios.delete(
      `https://server.webmarker.link/bookmarks/${selectBookmarkId}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then(() => {
      dispatch(moveBookmark(false));
      alert("삭제 완료!");
      getFolders();
    });
  };
  const moveFolder = () => {
    dispatch(moveBookmark(true));
  };

  const changeTags = useCallback((tags) => {
    setBookmarkInfo((prev) => ({
      ...prev,
      tag: tags,
    }));
  }, []);
  useEffect(() => {
    if (selectData === null) {
      setBookmarkInfo({
        title: "",
        tag: [],
        url: "",
        contents: "",
      });
      setIsEditMode(false);
      return;
    }
    const { name, Tags, url, content } = selectData;

    setBookmarkInfo({
      title: name,
      tag: Tags.map((item) => item.name),
      url,
      contents: content,
    });
  }, [selectData]);

  return (
    <div className={`AddBookmarkInfo ${isViewMode ? "isView" : ""}`}>
      <div
        id={`${isViewMode ? "bookmarkinfo-title-view" : "bookmarkinfo-title"}`}
      >
        Bookmark Info
      </div>
      <div className="form-wrapper">
        <input
          name="title"
          value={bookmarkInfo.title}
          className="title-input"
          type="text"
          placeholder="북마크 이름"
          onChange={bookmarkInfoHandler}
        />
        <input
          name="url"
          value={bookmarkInfo.url}
          className="title-input"
          type="text"
          placeholder="URL"
          onChange={bookmarkInfoHandler}
        />
        <Tag values={bookmarkInfo.tag} onChange={changeTags} />
        {isViewMode ? <div className={`disable-wrapper`}></div> : null}
      </div>
      <div id="cke-wrapper">
        <CKEditor
          id="cke"
          name="contents"
          editor={ClassicEditor}
          data={bookmarkInfo.contents}
          onChange={contentHandler}
          config={{
            isReadOnly: true,
          }}
        />
      </div>
      <div id="submit-btn-wrapper">
        <button
          className="submit-btn"
          onClick={isViewMode ? setEditMode : submitReview}
        >
          {isViewMode ? "수정" : "저장"}
        </button>
        {selectData !== null ? (
          <button className="submit-btn" onClick={moveFolder}>
            이동
          </button>
        ) : null}
        {selectData !== null ? (
          <button className="submit-btn" onClick={closeEdit}>
            닫기
          </button>
        ) : null}
        {selectData !== null ? (
          <button id="delete" className="submit-btn" onClick={removeBookmark}>
            삭제
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default AddBookmarkInfo;
