import { useDispatch } from "react-redux";
import { selectBookmark } from "../actions/selectBookmark";

function Bookmark({ title, id, url }) {
  const dispatch = useDispatch();

  const selectCurrentBookmark = () => {
    dispatch(selectBookmark(id));
  };

  const openLink = () => {
    window.open(`${url}`);
  };

  return (
    <article className="bookmark-wrapper">
      <div onClick={openLink} className="bookmark">
        {title}
      </div>
      <div>
        <button onClick={selectCurrentBookmark} className="lookup-btn">
          조회
        </button>
      </div>
    </article>
  );
}

export default Bookmark;
