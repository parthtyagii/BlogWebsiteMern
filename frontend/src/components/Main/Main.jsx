import React from 'react'
import './Main.css';
import Blog from '../Blog/Blog';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


function Main({ posts }) {

    return (
        <div className='main-container'>

            {posts.map((post) => {
                return (
                    <Blog key={post._id} postDate={post.postDate} userId={post.userId} username={post.username} title={post.title} desc={post.desc} postId={post.postId} postImg={post.postImg} />
                );
            })}

        </div>
    );
}

export default Main;
