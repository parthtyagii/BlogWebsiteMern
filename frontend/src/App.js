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



function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Main /> */}
      {/* <Homepage /> */}
      {/* <SinglePostPage /> */}
      {/* <CreateBlog /> */}
      {/* <AccountPage /> */}
      {/* <Login /> */}
      <Registration />
    </div>
  );
}

export default App;
