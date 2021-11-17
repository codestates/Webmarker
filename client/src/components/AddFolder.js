import axios from "axios";

function AddFolder() {
  const createFolder = () => {
    const folderName = prompt("폴더이름을 입력해 주세요");

    axios.post(
      "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/folders",
      {
        name: folderName,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };
  return (
    <article className="add-folder">
      <button className="addfolder-btn" onClick={createFolder}>
        +
      </button>
    </article>
  );
}

export default AddFolder;
