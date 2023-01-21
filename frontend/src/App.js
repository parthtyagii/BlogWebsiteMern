import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Homepage from './pages/Homepage/Homepage';
import SinglePostPage from './pages/SinglePostPage/SinglePostPage';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import AccountPage from './pages/AccountPage/AccountPage';
import Login from './pages/Authentication/Login';
import Registration from './pages/Authentication/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Homepage />} />
        <Route path='/post/:id' element={<SinglePostPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/account/:id' element={<AccountPage />} />
        <Route path='/createBlog' element={<CreateBlog />} />




        {/* <Homepage /> */}
        {/* <SinglePostPage /> */}
        {/* <CreateBlog /> */}
        {/* <AccountPage /> */}
        {/* <Login /> */}
        {/* <Registration /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
