import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import { BlogContext } from '../../context/Context';
import { useContext } from 'react';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import BarLoader from 'react-spinners/BarLoader';
import axios from 'axios';

const STYLE = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

function Homepage() {

    const { user, dispatch } = useContext(BlogContext);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/blog/api/posts/`);
            if (response) {
                setTimeout(() => {
                    setPosts(response.data);
                    setLoading(false);
                }, 1000);
            }
        }
        catch (e) {
            console.log('cannot get all posts!');
            console.log(e);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {loading &&
                <div className="homepageLoader" style={STYLE}>
                    <BarLoader color="black" height='8px' width='200px' />
                </div>
            }

            {!loading && (
                <>
                    <Navbar />
                    <Header />
                    <Main posts={posts} />
                </>
            )}
        </>
    );
}

export default Homepage;
