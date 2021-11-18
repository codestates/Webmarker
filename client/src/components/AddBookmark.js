import { useDispatch } from "react-redux";
import { selectFolder } from "../actions/folder";
import { selectBookmark } from "../actions/selectBookmark";

function AddBookmark({ id }) {
  const dispatch = useDispatch();
  const removeSelectId = () => {
    dispatch(selectBookmark(null));
    dispatch(selectFolder(id));
  };
  return (
    <article className="addbookmark" onClick={removeSelectId}>
      <button className="add-btn">+</button>
    </article>
  );
}

export default AddBookmark;
