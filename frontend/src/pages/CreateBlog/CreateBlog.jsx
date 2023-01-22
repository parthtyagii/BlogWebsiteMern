import React from 'react';
import './CreateBlog.css';
import Navbar from '../../components/Navbar/Navbar';
import { v4 as uuid } from 'uuid';
import { BlogContext } from '../../context/Context';
import { useContext, useRef } from 'react';
import axios from 'axios';



function CreateBlog() {

    const { user } = useContext(BlogContext);
    const titleRef = useRef();
    const descRef = useRef();
    const postId = uuid();
    const username = JSON.parse(localStorage.getItem('user')).username;

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(titleRef.current.value, descRef.current.value)
        try {
            const response = await axios.post('/posts/', {
                username,
                title: titleRef.current.value,
                desc: descRef.current.value,
                postId
            });
            // console.log(response.data);
            window.location.replace('/');
        }
        catch (e) {
            console.log('cannot create post!');
            console.log(e);
        }
    };


    return (
        <>
            <Navbar />

            <div className='createBlogContainer'>

                <div className="createBlogImg">
                    <img src="https://i.pinimg.com/736x/cf/c4/33/cfc433dd230aebb43cd9a3dc60a2454f.jpg" alt="" />
                </div>

                <form onSubmit={submitHandler} >

                    <div className="createBlogTitle">
                        <label htmlFor="inputImg" >
                            <i className="fa-solid fa-plus"></i>
                        </label>
                        <input id='inputImg' type="file" className='createBlogTitleFile' />
                        <input type="text" ref={titleRef} className='createBlogTitleText' placeholder='add title...' />
                    </div>

                    <div className="createBlogDesc">
                        <textarea name="createBlogDesc" ref={descRef} placeholder='tell your story...'></textarea>
                    </div>

                    <div className="createBlogSubmit">
                        <button>SUBMIT</button>
                    </div>

                </form>

            </div>
        </>
    );
}

export default CreateBlog;
