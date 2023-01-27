import React from 'react';
import BlogBanner from '../../BlogBanner.jpg';
import './Header.css';

function Header() {
    return (
        <div className='headerContainer'>
            <span className='pehla'>MERN</span>
            <span className='doosra'>BLOG</span>
            <div className="banner">
                <img src={BlogBanner} alt="blog_banner" />
            </div>
        </div>
    )
}

export default Header;
