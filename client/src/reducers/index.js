import { combineReducers } from "redux";
import bookmarkReducer from "./bookmark";
//리듀서 임포트 해야함

const rootReducer = combineReducers({
  // 앞으로 생성할 리듀서 추가
  bookmark: bookmarkReducer,
});

export default rootReducer;
