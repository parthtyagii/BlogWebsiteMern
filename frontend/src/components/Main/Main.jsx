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
            setPosts(response.data);
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
        <div className='main-container'>

            {posts.map((post) => {
                return (
                    <Blog key={post._id} userId={post.userId} username={post.username} title={post.title} desc={post.desc} postId={post.postId} postImg={post.postImg} />
                );
            })}

        </div>
    );
}

export default Main;
