import Folder from "./Folder";
import AddFolder from "./AddFolder";
import { useState } from "react";

function BookmarkList() {
  //저장된 폴더 수
  const [folderCount, setFolderCount] = useState([1, 2]);

  return (
    <section id="bookmark-list-wrapper">
      <div id="bookmark-title">Bookmark List</div>
      {folderCount.map(() => (
        <Folder />
      ))}
      <AddFolder />
    </section>
  );
}

export default BookmarkList;
