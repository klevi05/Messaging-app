import React, { useState } from 'react';

let names = {
    name: "Klevi",
}
 
function Name(){
    function openCoversation(id){
        console.log(id)
    }
    const [val] = useState()
    const searchName = e => {
        console.log(e.target.value)
    }
    return(
        <div className="name">
            <nav className="navbar navbar-light">
                <form className="form">
                    <input type="text" id="searchbar" placeholder="Search.." name="search" value={val} onChange={searchName}/>
                    <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="#2196F3" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                    </button>
                </form>
            </nav>
            <div className="people">
                <div className="peopleTagBox">
                        <button className="peopleTagBoxButton" onClick={()=> openCoversation(1234)}>
                            <p>{names["name"]}</p>
                            <p>hello</p>
                        </button>
                        <button className="peopleTagBoxButton" onClick={()=>openCoversation(1233)}>
                            <p>{names["name"]}</p>
                            <p className="peopleTagBoxLastMesage">helloooooooooooooooooooooooooooooooooooo</p>
                        </button>
                </div>
            </div>
        </div>
    )
}

export default Name;