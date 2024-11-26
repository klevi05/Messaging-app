import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/LogIn/login';
import Signin from './components/SignIn/signIn';
import Home from './components/home/home';
import Verification from './components/verification/verification';
import Settings from './components/settings/settings';
import NotFound from './components/notFound/notFound';
import Admin from './components/admin/admin';
import AddUser from './components/addUser/addUser';
import Task from './components/task/task';
function App(){
  //defining the routes I will be needing for differente pages
    return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route index path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signin/>}/>
          <Route path='/verification' element={<Verification/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/task' element={<Task/>}/>
          <Route path='/addUser/:uuid/:company/:role' element={<AddUser/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    )
}
export default App;