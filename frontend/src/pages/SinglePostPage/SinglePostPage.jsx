import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './SinglePostPage.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRef, useContext } from 'react';
import { BlogContext } from '../../context/Context';
import Blog from '../../components/Blog/Blog';
import BarLoader from 'react-spinners/BarLoader';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();



function SinglePostPage() {

    const [postInfo, setPostInfo] = useState({});
    const { user } = useContext(BlogContext);
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [singlePageMessage, setSinglePageMessage] = useState(false);
    const [loading, setLoading] = useState(false);


    const editHandler = async (e) => {
        setEdit(true);
        setTitle(postInfo.title);
        setDesc(postInfo.desc);
    }

    const deleteHandler = async (e) => {
        setLoading(true);
        try {
            const response1 = await axios.get(`${process.env.REACT_APP_BACKEND}/blog/api/posts/${id}`);

            try {
                if (response1.data.postImg.public_id !== "postImages/ickfyvovuaaz8vvzgnn1") {
                    const response2 = await axios.delete(`${process.env.REACT_APP_BACKEND}/blog/api/postImg?id=${response1.data.postImg.public_id}`);
                }
            }
            catch (e) {
                console.log('cannot delete image!');
                console.log(e);
            }
        }
        catch (e) {
            console.log('cannot get post infos to delete it!');
            console.log(e);
        }


        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/blog/api/posts/${id}`);
            setLoading(false);
            window.location.replace('/');
        }
        catch (e) {
            console.log('cannot delete!');
            console.log(e);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND}/blog/api/posts/${id}`, {
                title,
                desc
            });

            if (response) {
                setTimeout(() => {
                    setPostInfo(response.data);
                    setEdit(false);
                    setLoading(false);
                    setSinglePageMessage(true);
                    setTimeout(() => {
                        setSinglePageMessage(false);
                    }, 3000);
                }, 1000);
            }
        }
        catch (e) {
            console.log('cannot update!');
            console.log(e);
        }
    }

    const getPostInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/blog/api/posts/${id}`);
            if (response) {
                setTimeout(() => {
                    setPostInfo(response.data);
                    setLoading(false);
                }, 1000);
            }
        }
        catch (e) {
            console.log('cannot get post!');
            console.log(e);
        }
    };

    useEffect(() => {
        getPostInfo();
    }, []);


    return (
        <>
            <Navbar />

            {loading &&
                <div className="singlePostPageLoader">
                    <BarLoader color="black" height='8px' width='200px' />
                </div>
            }

            {!loading && (
                <>
                    <div className="singlePostContainer" data-aos="fade-up" data-aos-duration="1000">

                        {(!postInfo || !postInfo.postImg) &&
                            <div className="singlePostImg">
                                <img src='https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg' alt="post_image" />
                            </div>
                        }

                        {postInfo && postInfo.postImg &&
                            <div className="singlePostImg">
                                <img src={postInfo.postImg.secure_url} alt="post_image" />
                            </div>
                        }

                        {!edit &&
                            <>
                                <div className="singlePostTitle">
                                    <div className="singlePostTitleText">
                                        {postInfo.title}
                                    </div>

                                    {user && (user.userId === postInfo.userId) &&
                                        <div className="singlePostEdit">
                                            <button onClick={editHandler}><i className="editIcon fa-regular fa-pen-to-square"></i></button>
                                            <button onClick={deleteHandler}><i className="editIcon fa-solid fa-trash-can"></i></button>
                                        </div>
                                    }
                                </div>

                                <div className="singlePostDesc">
                                    {postInfo.desc}
                                </div>

                                <div className="singlePostAuthor">
                                    Author : <span>{postInfo.username}</span>
                                </div>
                            </>
                        }

                        {edit &&
                            <>
                                <form onSubmit={submitHandler}>

                                    <div className="singlePostTitle">
                                        <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
                                    </div>

                                    <div className="singlePostDesc">
                                        <textarea onChange={e => setDesc(e.target.value)} value={desc}></textarea>
                                    </div>

                                    <div className="postUpdateSubmit">
                                        <button type='submit'>UPDATE</button>
                                    </div>

                                </form>

                            </>
                        }

                    </div>

                    {singlePageMessage &&
                        <div className="singlePageMessage">
                            post has been updated!
                        </div>
                    }
                </>
            )}

        </>
    )
}

export default SinglePostPage;
