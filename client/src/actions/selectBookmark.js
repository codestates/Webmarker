export const SELECT_BOOKMAKR = "SELECT_BOOKMAKR";
export const FILTER_BOOKMAKR = "FILTER_BOOKMAKR";
export const FILTER_TYPE = "FILTER_TYPE";
export const MOVE_BOOKMARK = "MOVE_BOOKMARK";

export const selectBookmark = (payload) => ({
  type: SELECT_BOOKMAKR,
  payload,
});

export const filterBookmark = (payload) => ({
  type: FILTER_BOOKMAKR,
  payload,
});

export const filterType = (payload) => ({
  type: FILTER_TYPE,
  payload,
});
export const moveBookmark = (payload) => ({
  type: MOVE_BOOKMARK,
  payload,
});
