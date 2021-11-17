import { LOG_IN, LOG_OUT } from "../actions/loginChange";
import { bookMarkInitialState } from "./initialState";

const loginReducer = (state = bookMarkInitialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return Object.assign({}, state, {
        login: true,
      });
    }
    case LOG_OUT: {
      return Object.assign({}, state, {
        login: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
