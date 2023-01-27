import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import { BlogContext } from '../../context/Context';
import { useContext } from 'react';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';


function Homepage() {

    const { user, dispatch } = useContext(BlogContext);

    return (
        <>
            <Navbar />
            <Header />
            <Main />
        </>
    );
}

export default Homepage;
