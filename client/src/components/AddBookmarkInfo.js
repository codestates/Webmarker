import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";

function AddBookmarkInfo() {
  const [BookmarkInfo, setBookmarkInfo] = useState({
    title: "",
    tag: "",
    url: "",
    contents: "",
  });

  //입력 버튼을 누르면 서버로 북마크 정보 전송
  const submitReview = () => {
    Axios.post("http://webmarker/bookmarks", {
      title: BookmarkInfo.title,
      tag: BookmarkInfo.tag,
      url: BookmarkInfo.url,
      contents: BookmarkInfo.contents,
    }).then(() => {
      alert("등록 완료!");
    });
  };

  const getValue = (e) => {
    const { title, value } = e.target;
    setBookmarkInfo({
      ...BookmarkInfo,
      [title]: value,
      tag: value,
      url: value,
    });
  };

  return (
    <div className="AddBookmarkInfo">
      <div id="bookmarkinfo-title">Bookmark Info</div>
      <div className="form-wrapper">
        <input
          className="title-input"
          type="text"
          placeholder="북마크 이름"
          onChange={getValue}
        />
        <input
          className="title-input"
          type="text"
          placeholder="TAG"
          onChange={getValue}
        />
        <input
          className="title-input"
          type="text"
          placeholder="URL"
          onChange={getValue}
        />
      </div>
      <div id="cke-wrapper">
        <CKEditor
          id="cke"
          editor={ClassicEditor}
          data="<p>BookmarkInfo</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setBookmarkInfo({
              ...BookmarkInfo,
              contents: data,
            });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      <button className="submit-button" onClick={submitReview}>
        입력
      </button>
    </div>
  );
}

export default AddBookmarkInfo;
