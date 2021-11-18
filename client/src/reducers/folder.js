import { SELECT_FOLDER, SET_FOLDERS } from "../actions/folder";

const initialState = {
  folders: [],
  selectFolderId: null,
};

const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLDERS: {
      return {
        ...state,
        folders: action.payload,
      };
    }
    case SELECT_FOLDER: {
      return {
        ...state,
        selectFolderId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default folderReducer;
