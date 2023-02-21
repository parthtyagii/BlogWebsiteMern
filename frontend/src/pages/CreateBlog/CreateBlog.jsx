import React from 'react';
import './CreateBlog.css';
import Navbar from '../../components/Navbar/Navbar';
import { v4 as uuid } from 'uuid';
import { BlogContext } from '../../context/Context';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';



const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function CreateBlog() {

    const { user } = useContext(BlogContext);
    const titleRef = useRef();
    const descRef = useRef();
    const postId = uuid();
    const [file, setFile] = useState(null);
    const username = JSON.parse(localStorage.getItem('user')).username;
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const date = new Date();

        const newFormData = {
            username,
            userId: user.userId,
            title: titleRef.current.value,
            desc: descRef.current.value,
            postId,
            postDate: date.getDate().toString() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear().toString(),
            postImg: {
                public_id: "postImages/ickfyvovuaaz8vvzgnn1",
                secure_url: "https://res.cloudinary.com/dw0up71e2/image/upload/v1675568384/postImages/ickfyvovuaaz8vvzgnn1.jpg"
            }
        }

        //upload code
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post(`${process.env.REACT_APP_BACKEND}/blog/api/postImg`, formData);
                newFormData.postImg = response.data;
            }
            catch (e) {
                console.log('cannot upload file!');
                console.log(e);
            }
        }

        //database code
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/blog/api/posts/`, newFormData);
            setLoading(false);
            window.location.replace(`/post/${postId}`);
        }
        catch (e) {
            console.log('cannot create post!');
            console.log(e);
        }
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            <Navbar />

            {loading &&
                <div className="createPageLoader">
                    <BarLoader color="black" height='8px' width='200px' />
                </div>
            }

            {!loading &&

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
                            <input type="text" ref={titleRef} className='createBlogTitleText' placeholder='add title' />
                        </div>

                        <div className="createBlogDesc">
                            <textarea name="createBlogDesc" ref={descRef} placeholder='tell your story'></textarea>
                        </div>

                        <div className="createBlogSubmit">
                            <button>SUBMIT</button>
                        </div>

                    </form>

                </div>
            }
        </>
    );
}

export default CreateBlog;
