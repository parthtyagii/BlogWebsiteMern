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



function SinglePostPage() {

    const [postInfo, setPostInfo] = useState({});
    const { user } = useContext(BlogContext);
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [singlePageMessage, setSinglePageMessage] = useState(false);


    const editHandler = async (e) => {
        setEdit(true);
        setTitle(postInfo.title);
        setDesc(postInfo.desc);
    }

    const deleteHandler = async (e) => {

        try {
            const response1 = await axios.get(`${process.env.REACT_APP_BACKEND}/blog/api/posts/${id}`);

            if (response1.data.postImg !== 'sample.jpg') {
                const response2 = await axios.delete(`${process.env.REACT_APP_BACKEND}/blog/api/postImg/${response1.data.postImg}`);
            }
        }
        catch (e) {
            console.log('cannot delete image!');
            console.log(e);
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/blog/api/posts/${id}`);
            window.location.replace('/');
        }
        catch (e) {
            console.log('cannot delete!');
            console.log(e);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND}/blog/api/posts/${id}`, {
                title,
                desc
            });

            setPostInfo(response.data);
            setEdit(false);
            setSinglePageMessage(true);
            setTimeout(() => {
                setSinglePageMessage(false);
            }, 3000);
        }
        catch (e) {
            console.log('cannot update!');
            console.log(e);
        }
    }

    const getPostInfo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND}/blog/api/posts/${id}`);
            setPostInfo(response.data);
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

            <div className="singlePostContainer">

                <div className="singlePostImg">
                    <img src={`${process.env.REACT_APP_BACKEND}/postImages/${postInfo.postImg}`} alt="post_image" />
                </div>


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
    )
}

export default SinglePostPage;
