import React from "react";
//북마크를 찾는 검색바

function Search ({ setSearchInput }) {
    const handleSearchInputChange = (e) => {
		const searchInput = e.target.value;
		setSearchInput(searchInput);
    };
    //검색창에 입력된 값이 setSearchInput에 저장된다.

    return (
        <div>
        <input       
            type="text"
            placeholder="북마크 검색"
            onChange={handleSearchInputChange}
        />
        <button >
            Search
        </button>
    </div>
    );
  }
  
  export default Search;
  