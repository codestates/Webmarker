import { useDispatch } from "react-redux";
import { selectBookmark } from "../actions/selectBookmark";

function Bookmark({ title, id }) {
  const dispatch = useDispatch();

  const selectCurrentBookmark = () => {
    dispatch(selectBookmark(id));
  };
  return (
    <article onClick={selectCurrentBookmark}>
      <div className="bookmark">{title}</div>
    </article>
  );
}

export default Bookmark;
