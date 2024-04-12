import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/LogIn/login';
import Signin from './components/SignIn/signIn';
import Home from './components/home/home';

function App(){
    return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/signup' element={<Signin/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    )
}
export default App;