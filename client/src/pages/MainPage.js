import React from "react";
import Search from "../components/Search";
import { useState, useEffect} from 'react';

function MainPage() {
    const [searchInput, setSearchInput] = useState('');

    return (
      <section>       
        <center>
          <Search setSearchInput={setSearchInput} />
        </center>        
      </section>
    );
  }
  
  export default MainPage;
  