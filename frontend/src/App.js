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
import { BlogContext } from './context/Context';
import { useCallback } from 'react';
import { useContext } from 'react';


function App() {

  const { user } = useContext(BlogContext);

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Homepage />} />
        <Route path='/post/:id' element={<SinglePostPage />} />
        <Route path='/login' element={user ? <Homepage /> : <Login />} />
        <Route path='/register' element={user ? <Homepage /> : <Registration />} />
        <Route path='/account/:id' element={!user ? <Homepage /> : <AccountPage />} />
        <Route path='/createBlog' element={!user ? <Homepage /> : <CreateBlog />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
