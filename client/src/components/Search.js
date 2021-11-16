import React, { useState } from "react";
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
          placeholder="북마크 검색"
        />
        {existOnReset ? <span onClick={resetHandler}>X</span> : null}
      </div>
      <button id="search-btn" onClick={clickHandler}>
        Search
      </button>
    </div>
  );
}

export default Search;
