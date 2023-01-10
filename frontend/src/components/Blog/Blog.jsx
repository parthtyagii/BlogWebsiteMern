import React from 'react'
import './Blog.css';


function Blog() {
    return (
        <div className="blog-container">

            <div className="blogImg">
                <img src="https://wallpaperaccess.com/full/780293.jpg" alt="" />
                <img className='authorImg' src="https://wallpaper.dog/large/20417959.jpg" alt="" />
            </div>

            <div className="blogTitle">
                JENNIFER LAWRENCE
            </div>

            <div className="blogDesc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quasi laudantium suscipit quam!
                Tempore explicabo dolor debitis ratione, magni impedit ipsam cupiditate porro officiis quod
                nihil, sapiente voluptate, velit quaerat!
            </div>

            <div className="blogFooter">
                January 10, 2023
            </div>

        </div>
    );
}

export default Blog;
