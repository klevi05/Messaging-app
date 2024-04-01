import React from 'react';
import Name from './Name/Name';
import Chats from './Chats/Chats';
import './Pages.css'
import '../main.css'
function Pages() {
  return (
    <>
    <h1 className='title'>SpachoUnited</h1>
    <div className="App">
      <div className='box'>
        <Name/>
        <Chats/>
      </div>
    </div>
    </>
  );
}

export default Pages;
