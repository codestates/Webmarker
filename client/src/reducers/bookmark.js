import { MAKE_BOOKMAKR } from "../actions/makeBookmark";
import { SELECT_BOOKMAKR } from "../actions/selectBookmark";
import { EDIT_BOOKMARK } from "../actions/eidtBookmark";
import { bookMarkInitialState } from "../reducers/initialState";

const bookmarkReducer = (state = bookMarkInitialState, action) => {
  switch (action.type) {
    case MAKE_BOOKMAKR: {
      const newBookMark = { ...action.payload, id: Date.now() };

      return {
        ...state,
        bookmarks: state.bookmarks.concat(newBookMark),
      };
    }
    case SELECT_BOOKMAKR: {
      return {
        ...state,
        selectBookmarkId: action.payload,
      };
    }
    case EDIT_BOOKMARK: {
      const { id, data } = action.payload;
      return {
        ...state,
        bookmarks: state.bookmarks.map((item) => {
          if (item.id !== id) {
            return item;
          }
          return { ...item, ...data };
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export default bookmarkReducer;
