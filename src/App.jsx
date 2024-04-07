import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/LogIn/login';
import Signin from './components/SignIn/signIn';
import Home from './components/home/home';
import Cookies from 'js-cookie'
function App(){
    window.addEventListener("beforeunload", () => 
    {  
        Cookies.remove('user')
    })
    return(
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route path='/signup' element={<Signin/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    )
}
export default App;