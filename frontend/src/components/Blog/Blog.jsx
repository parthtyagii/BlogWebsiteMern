import React from 'react'
import './Blog.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


function Blog({ title, desc, postId, postImg, userId, postDate }) {

    const [userInfo, setUserInfo] = useState(null);


    const getDesc = (str) => {
        let words = str.split(" ");
        words = words.filter((w) => {
            return (w !== ' ');
        })
        words = words.splice(0, 40);
        str = words.join(' ') + '...';
        return str;
    }

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/blog/api/user/${userId}`);
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
                <img src={postImg.secure_url} alt="post_image" />
                {userInfo &&
                    <img className='authorImg' src={userInfo.userImg.secure_url} alt="user_image" />
                }
            </div>

            <Link className='link' to={`/post/${postId}`}>
                <div className="blogTitle">
                    {title}
                </div>

                <div className="blogDesc">
                    {
                        getDesc(desc)
                    }
                </div>
            </Link>

            <div className="blogFooter">
                {postDate}
            </div>

        </div>
    );
}

export default Blog;
