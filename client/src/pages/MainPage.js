import React from "react";
import Search from "../components/Search";
import { useState, useEffect} from "react";
import BookmarkList from "../components/BookmarkList";
import BookmarkInfo from "../components/BookmarkInfo";
import AddBookmarkInfo from "../components/AddBookmarkInfo";

function MainPage() {
    const [searchInput, setSearchInput] = useState('');

    return (
      <section>       
        <center>
          <Search setSearchInput={setSearchInput} />
        </center>
        <section
          style={{           
            float: "left",
            }}
        >
          <BookmarkList />
        </section>
        <section
          style={{           
            float: "right",
            margin: "10px",
            }}
        >
          <AddBookmarkInfo />
        </section>        
      </section>
    );
  }
  
  export default MainPage;
  