import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import { BlogContext } from '../../context/Context';
import { useContext } from 'react';
import { useEffect } from 'react';


function Homepage() {

    // const { user, dispatch } = useContext(BlogContext);
    // console.log(user);


    return (
        <>
            <Navbar />
            <Main />
        </>
    );
}

export default Homepage;
