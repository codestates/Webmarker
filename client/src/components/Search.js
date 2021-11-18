import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

//북마크를 찾는 검색바
function Search({ onSearch, onReset }) {
  const [keyword, setKeyword] = useState("");
  const existOnReset = typeof onReset === "function";

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const clickHandler = () => {
    onSearch(keyword);
  };

  const resetHandler = () => {
    setKeyword("");

    if (existOnReset) {
      onReset();
    }
  };

  return (
    <div id="search-bar">
      <div className="input-wrapper">
        <input
          onChange={changeKeyword}
          id="search-box"
          type="text"
          value={keyword}
          placeholder="북마크 검색"
        />
        {existOnReset ? (
          <span id="reset-btn" onClick={resetHandler}>
            x
          </span>
        ) : null}
      </div>
      <button id="search-btn" onClick={clickHandler}>
        <FontAwesomeIcon icon={faSearch} color="#641eac" id="search-icon" />
      </button>
    </div>
  );
}

export default Search;
