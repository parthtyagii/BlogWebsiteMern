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



    const editHandler = async (e) => {
        setEdit(true);
        setTitle(postInfo.title);
        setDesc(postInfo.desc);
    }

    const deleteHandler = async (e) => {
        try {
            const response = await axios.delete(`/posts/${id}`);
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
            const response = await axios.put(`/posts/${id}`, {
                title,
                desc
            });

            setPostInfo(response.data);
            setEdit(false);
        }
        catch (e) {
            console.log('cannot update!');
            console.log(e);
        }
    }

    const getPostInfo = async () => {
        try {
            const response = await axios.get(`/posts/${id}`);
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

    // console.log(user)

    return (
        <>
            <Navbar />

            <div className="singlePostContainer">

                <div className="singlePostImg">
                    <img src="https://wallpaperaccess.com/full/780293.jpg" alt="" />
                </div>


                {!edit &&
                    <>
                        <div className="singlePostTitle">
                            <div className="singlePostTitleText">
                                {postInfo.title}
                            </div>

                            {user && (user.username === postInfo.username) &&
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
        </>
    )
}

export default SinglePostPage;
