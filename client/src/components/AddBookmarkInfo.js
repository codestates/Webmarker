import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";
import { makeBookmark } from "../actions/makeBookmark";
import bookmarkReducer from "../reducers/bookmark";
import { editBookmark } from "../actions/eidtBookmark";
import { selectBookmark } from "../actions/selectBookmark";

function AddBookmarkInfo() {
  const dispatch = useDispatch();
  const selectBookmarkId = useSelector(
    (store) => store.bookmark.selectBookmarkId
  );
  const selectData =
    useSelector((store) =>
      store.bookmark.bookmarks.find((item) => item.id === selectBookmarkId)
    ) ?? null;
  // ?? 앞에 데이터의 값이 undefinde나 null 일때 ?? 뒤에 값을 가진다.

  const [isEditMode, setIsEditMode] = useState(false);
  const [bookmarkInfo, setBookmarkInfo] = useState({
    title: "",
    tag: "",
    url: "",
    contents: "",
  });

  const isViewMode = selectData !== null && !isEditMode;

  // 입력 버튼을 누르면 서버로 북마크 정보 전송
  const submitReview = () => {
    if (selectData !== null) {
      dispatch(
        editBookmark({
          id: selectData.id,
          data: bookmarkInfo,
        })
      );
      // Axios.put("http://webmarker/bookmarks/id", {
      //   title: bookmarkInfo.title,
      //   tag: bookmarkInfo.tag,
      //   url: bookmarkInfo.url,
      //   contents: bookmarkInfo.contents,
      // }).then(() => {
      //   alert("수정 완료!");
      // });
      return;
    }

    // Axios.post("http://webmarker/bookmarks", {
    //   title: bookmarkInfo.title,
    //   tag: bookmarkInfo.tag,
    //   url: bookmarkInfo.url,
    //   contents: bookmarkInfo.contents,
    // }).then(() => {
    //   alert("등록 완료!");
    // });

    dispatch(makeBookmark(bookmarkInfo));
    setBookmarkInfo({
      title: "",
      tag: "",
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
  };

  const closeEdit = () => {
    setIsEditMode(false);
    dispatch(selectBookmark(null));
  };
  useEffect(() => {
    if (selectData === null) {
      setBookmarkInfo({
        title: "",
        tag: "",
        url: "",
        contents: "",
      });
      setIsEditMode(false);
      return;
    }
    const { title, tag, url, contents } = selectData;

    setBookmarkInfo({
      title,
      tag,
      url,
      contents,
    });
  }, [selectData]);

  return (
    <div className="AddBookmarkInfo">
      <div id="bookmarkinfo-title">Bookmark Info</div>
      <div className={`disable-wrapper ${isViewMode ? "hidden" : ""}`}>
        {isViewMode ? <div className="disable-background" /> : null}
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
            name="tag"
            value={bookmarkInfo.tag}
            className="title-input"
            type="text"
            placeholder="TAG"
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
      </div>

      <button
        className="submit-button"
        onClick={isViewMode ? setEditMode : submitReview}
      >
        {isViewMode ? "수정" : "저장"}
      </button>
      {selectData !== null ? (
        <button className="submit-button" onClick={closeEdit}>
          닫기
        </button>
      ) : null}
    </div>
  );
}

export default AddBookmarkInfo;
