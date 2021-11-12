import Folder from "./Folder";
import AddFolder from "./AddFolder"
import { useState} from "react";


function BookmarkList () {
    //저장된 폴더 수
    const [folderCount, setFolderCount] = useState([1, 2]);

    return (
      <section      
        style={{
          border: "1px solid black",
          background: "blue",
          color: "black",
          height: "700px",
          width: "600px",
          }}
        >       
        <center>
          {folderCount.map(() => (
		    <Folder />
		  ))}
          
        </center>
        <center>
          <AddFolder />   
        </center>        
      </section>
    );
  }
  
  export default BookmarkList;