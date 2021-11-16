import { MAKE_BOOKMAKR } from "../actions/makeBookmark";
import {
  FILTER_BOOKMAKR,
  FILTER_TYPE,
  SELECT_BOOKMAKR,
} from "../actions/selectBookmark";
import { EDIT_BOOKMARK } from "../actions/eidtBookmark";
import { DELETE_BOOKMAKR } from "../actions/deleteBookmark";
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
    case DELETE_BOOKMAKR: {
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload
        ),
      };
    }
    case FILTER_TYPE: {
      return {
        ...state,
        filterType: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default bookmarkReducer;
