export const SET_FOLDERS = "SET_FOLDERS";
export const SELECT_FOLDER = "SELECT_FOLDER";

export const setFolders = (payload) => ({
  type: SET_FOLDERS,
  payload,
});

export const selectFolder = (payload) => ({
  type: SELECT_FOLDER,
  payload,
});
