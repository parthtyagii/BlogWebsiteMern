import React from 'react'
import './Blog.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


function Blog({ title, desc, postId, postImg, userId }) {

    const url = 'http://localhost:5000/postImages/';

    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`/user/${userId}`);
            setUserInfo(response.data);
        }
        catch (e) {
            console.log('cannot get user info!');
            console.log(e);
        }
    }

    useEffect(() => {
        if (userInfo === null) {
            getUserInfo();
        }
    }, [userInfo]);


    return (
        <div className="blog-container">

            <div className="blogImg">
                <img src={'http://localhost:5000/postImages/' + postImg} alt="post_image" />
                {userInfo &&
                    <img className='authorImg' src={'http://localhost:5000/profileImages/' + userInfo.userImg} alt="user_image" />
                }
            </div>

            <Link className='link' to={`/post/${postId}`}>
                <div className="blogTitle">
                    {title}
                </div>

                <div className="blogDesc">
                    {desc}
                </div>
            </Link>

            <div className="blogFooter">
                January 10, 2023
            </div>

        </div>
    );
}

export default Blog;
