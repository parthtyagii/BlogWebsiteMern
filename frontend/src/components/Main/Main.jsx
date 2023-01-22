import React from 'react'
import './Main.css';
import Blog from '../Blog/Blog';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


function Main() {

    const [posts, setPosts] = useState([]);


    const getPosts = async () => {
        try {
            const response = await axios.get('/posts/');
            // console.log(response.data);
            setPosts(response.data);
        }
        catch (e) {
            console.log('cannot get all posts!');
            console.log(e);
        }
    };

    useEffect(() => {
        getPosts();
    }, [posts]);

    return (
        <div className='main-container'>

            {posts.map((post) => {
                // console.log(post._id);
                return (
                    <Blog key={post._id} title={post.title} desc={post.desc} postId={post.postId} />
                );
            })}

        </div>
    );
}

export default Main;
