import React, { useEffect } from 'react';
import './Authentication.css';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { BlogContext } from '../../context/Context';
import { useContext } from 'react';
import { useReducer, useRef } from 'react';
import { useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';


function Login() {

    const { dispatch, user, error } = useContext(BlogContext);
    const userRef = useRef();
    const passwordRef = useRef();
    const [loginMessage, setLoginMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/blog/api/auth/login`, {
                username: userRef.current.value,
                password: passwordRef.current.value
            });

            if (response) {

                setLoading(false);

                if (response.data !== 'Wrong credentials!') {
                    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
                    window.location.replace('/');
                }
                else {
                    dispatch({ type: 'LOGIN_FAILURE' });
                    if (userRef.current && passwordRef.current) {
                        userRef.current.value = '';
                        passwordRef.current.value = '';
                    }
                    setLoginMessage(true);
                    setTimeout(() => {
                        setLoginMessage(false);
                    }, 3000);
                }
            }
        }
        catch (e) {
            console.log('error during login!');
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
                <div className="authLoader">
                    <BarLoader color="black" height='8px' width='200px' />
                </div>
            }

            {!loading && (
                <>
                    <div className='authContainer'>

                        <div className="authCredentials">

                            <form onSubmit={submitHandler}>

                                <div className="authTitle">
                                    Sign In
                                </div>


                                <div className="authInput">
                                    <label>Username</label>
                                    <input type="text" ref={userRef} placeholder='parth' required />

                                    <label>Password</label>
                                    <input type="password" ref={passwordRef} required />
                                </div>

                                <div className="authSubmit">
                                    <button type='submit'>SUBMIT</button>
                                </div>

                            </form>

                        </div>

                        {loginMessage &&
                            <div className="loginMessage">
                                user not found!
                            </div>
                        }

                    </div>
                </>
            )}

        </>
    );
}

export default Login;
