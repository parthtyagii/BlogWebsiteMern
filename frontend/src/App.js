import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Homepage from './pages/Homepage/Homepage';
import SinglePostPage from './pages/SinglePostPage/SinglePostPage';



function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Main /> */}
      {/* <Homepage /> */}
      <SinglePostPage />
    </div>
  );
}

export default App;
