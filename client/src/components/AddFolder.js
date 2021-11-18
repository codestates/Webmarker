import axios from "axios";
import { useDispatch } from "react-redux";
import { setFolders } from "../actions/folder";

function AddFolder() {
  const disaptch = useDispatch();
  const fetchFolders = () => {
    axios
      .get("https://server.webmarker.link/bookmarks", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        disaptch(setFolders(response.data.data.folders));
      });
  };
  const createFolder = () => {
    const folderName = prompt("폴더이름을 입력해 주세요");

    axios
      .post(
        "https://server.webmarker.link/folders",
        {
          name: folderName,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(fetchFolders);
  };
  return (
    <article className="add-folder">
      <button onClick={createFolder} className="add-btn">
        +
      </button>
    </article>
  );
}

export default AddFolder;
