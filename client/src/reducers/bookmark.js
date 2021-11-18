import {
  FILTER_BOOKMAKR,
  FILTER_TYPE,
  MOVE_BOOKMARK,
  SELECT_BOOKMAKR,
} from "../actions/selectBookmark";
import { bookMarkInitialState } from "../reducers/initialState";

const bookmarkReducer = (state = bookMarkInitialState, action) => {
  switch (action.type) {
    case SELECT_BOOKMAKR: {
      return {
        ...state,
        selectBookmarkId: action.payload,
      };
    }
    case FILTER_BOOKMAKR: {
      return {
        ...state,
        keyword: action.payload,
      };
    }
    case FILTER_TYPE: {
      return {
        ...state,
        filterType: action.payload,
      };
    }
    case MOVE_BOOKMARK: {
      return {
        ...state,
        isMoveMode: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default bookmarkReducer;
