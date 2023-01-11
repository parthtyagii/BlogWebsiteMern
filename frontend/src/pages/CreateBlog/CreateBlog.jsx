import React from 'react';
import './CreateBlog.css';
import Navbar from '../../components/Navbar/Navbar';



function CreateBlog() {
    return (
        <>
            <Navbar />

            <div className='createBlogContainer'>

                <div className="createBlogImg">
                    <img src="https://i.pinimg.com/736x/cf/c4/33/cfc433dd230aebb43cd9a3dc60a2454f.jpg" alt="" />
                </div>

                <div className="createBlogTitle">
                    <label htmlFor="inputImg" >
                        <i class="fa-solid fa-plus"></i>
                    </label>
                    <input id='inputImg' type="file" className='createBlogTitleFile' />
                    <input type="text" className='createBlogTitleText' placeholder='add title...' />
                </div>

                <div className="createBlogDesc">
                    <textarea name="createBlogDesc" placeholder='tell your story...'></textarea>
                </div>

                <div className="createBlogSubmit">
                    <button>SUBMIT</button>
                </div>

            </div>
        </>
    );
}

export default CreateBlog;
