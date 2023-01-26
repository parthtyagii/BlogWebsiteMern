import React from 'react';
import './CreateBlog.css';
import Navbar from '../../components/Navbar/Navbar';
import { v4 as uuid } from 'uuid';
import { BlogContext } from '../../context/Context';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';



function CreateBlog() {

    const { user } = useContext(BlogContext);
    const titleRef = useRef();
    const descRef = useRef();
    const postId = uuid();
    const [file, setFile] = useState(null);
    const username = JSON.parse(localStorage.getItem('user')).username;

    const submitHandler = async (e) => {
        e.preventDefault();
        const newFormData = {
            username,
            userId: user.userId,
            title: titleRef.current.value,
            desc: descRef.current.value,
            postId,
        }

        //upload code
        if (file) {
            try {
                const formData = new FormData();
                const fileName = Date.now() + file.name;
                formData.append('name', fileName);
                formData.append('file', file);
                newFormData.postImg = fileName;

                const response = await axios.post('/postImg', formData);
            }
            catch (e) {
                console.log('cannot upload file!');
                console.log(e);
            }
        }

        //database code
        try {
            const response = await axios.post('/posts/', newFormData);
            window.location.replace(`/post/${postId}`);
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

                {file &&
                    <div className="createBlogImg">
                        <img src={URL.createObjectURL(file)} alt="post_image" />
                    </div>
                }

                <form onSubmit={submitHandler} encType="multipart/form-data">

                    <div className="createBlogTitle">
                        <label htmlFor="inputImg" >
                            <i className="fa-solid fa-plus"></i>
                        </label>
                        <input id='inputImg' type="file" onChange={(e) => setFile(e.target.files[0])} className='createBlogTitleFile' />
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
