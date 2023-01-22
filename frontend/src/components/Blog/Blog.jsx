import React from 'react'
import './Blog.css';
import { Link } from 'react-router-dom';


function Blog({ title, desc, postId }) {
    return (
        <div className="blog-container">

            <div className="blogImg">
                <img src="https://wallpaperaccess.com/full/780293.jpg" alt="" />
                <img className='authorImg' src="https://wallpaper.dog/large/20417959.jpg" alt="" />
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
