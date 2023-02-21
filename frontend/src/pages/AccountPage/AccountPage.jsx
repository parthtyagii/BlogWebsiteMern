import React from 'react';
import './AccountPage.css';
import Navbar from '../../components/Navbar/Navbar';
import { BlogContext } from '../../context/Context';
import { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import BarLoader from 'react-spinners/BarLoader';


function AccountPage() {

    const { user, dispatch } = useContext(BlogContext);
    const [file, setFile] = useState(null);
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [accountPageMessage, setAccountPageMessage] = useState(false);
    const [loading, setLoading] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_START' });
        setLoading(true);
        const newFormData = {
            username: nameRef.current.value || user.username,
            email: emailRef.current.value || user.email,
            password: passwordRef.current.value || user.password,
            userImg: user.userImg,
        };

        //image upload
        if (file) {
            if (user.userImg.public_id !== "profileImages/yaymwg5brzhvc5ww1pnb") {
                try {
                    const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/blog/api/profileImg?id=${user.userImg.public_id}`);
                }
                catch (e) {
                    console.log('cannot delete image!');
                    console.log(e);
                }
            }


            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post(`${process.env.REACT_APP_BACKEND}/blog/api/profileImg`, formData);
                newFormData.userImg = response.data;
            }
            catch (e) {
                console.log('cannot upload profile pic!');
                console.log(e);
            }
        }

        //update
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND}/blog/api/user/${user.userId}`, newFormData);
            dispatch({ type: 'UPDATE_SUCCESS', payload: response.data });

            setLoading(false);

            if (nameRef.current && emailRef.current && passwordRef.current) {
                nameRef.current.value = '';
                emailRef.current.value = '';
                passwordRef.current.value = '';
            }
            setAccountPageMessage(true);
            setTimeout(() => {
                setAccountPageMessage(false);
            }, 3000);
        }
        catch (e) {
            dispatch({ type: 'UPDATE_FAILURE' });
            console.log('cannot update profile!');
            console.log(e);
        }
    }


    const deleteHandler = async (e) => {
        setLoading(true);
        if (user.userImg.public_id !== "profileImages/yaymwg5brzhvc5ww1pnb") {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/blog/api/profileImg?id=${user.userImg.public_id}`);
            }
            catch (e) {
                console.log('cannot delete image!');
                console.log(e);
            }
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/blog/api/user/${user.userId}`);
            dispatch({ type: 'LOGOUT' });
            setLoading(false);
            window.location.replace('/');
        }
        catch (e) {
            console.log('cannot delete account!');
            console.log(e);
        }
    }

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    return (
        <>

            <Navbar />

            {loading &&
                <div className="accountPageLoader">
                    <BarLoader color="black" height='8px' width='200px' />
                </div>
            }

            {!loading && (
                <>
                    <div className="accountPageContainer">

                        <form onSubmit={submitHandler} encType="multipart/form-data">

                            <div className="accountPageImg">
                                {file &&
                                    <img src={URL.createObjectURL(file)} alt="user_image" />
                                }

                                {!file &&
                                    <img src={user.userImg.secure_url} alt="user_image" />
                                }


                                <label htmlFor='accountPageProfilePic'>
                                    <i className="fa-solid fa-plus"></i>
                                </label>
                                <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" name='accountPic' id='accountPageProfilePic' />
                            </div>


                            <div className="accountPageCredentials">

                                <label>Username</label>
                                <input type="text" ref={nameRef} placeholder={`${user.username}`} />

                                <label>Email</label>
                                <input type="email" ref={emailRef} placeholder={`${user.email}`} />

                                <label>Password</label>
                                <input type="password" ref={passwordRef} />

                            </div>

                            <div className="accountPageUpdate">
                                <button onSubmit={submitHandler}>UPDATE</button>
                            </div>

                        </form>

                        <div className="accountPageDelete">
                            <button onClick={deleteHandler}>DELETE ACCOUNT</button>
                        </div>

                    </div>

                    {accountPageMessage &&
                        <div className="accountPageMessage">
                            user has been updated!
                        </div>
                    }
                </>
            )}
        </>
    );
}

export default AccountPage;
