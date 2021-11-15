import { useDispatch } from "react-redux";
import { selectBookmark } from "../actions/selectBookmark";

function AddBookmark() {
  const dispatch = useDispatch();
  const removeSelectId = () => {
    dispatch(selectBookmark(null));
  };
  return (
    <article className="addbookmark" onClick={removeSelectId}>
      <button className="addbookmark-btn">+</button>
    </article>
  );
}

export default AddBookmark;
