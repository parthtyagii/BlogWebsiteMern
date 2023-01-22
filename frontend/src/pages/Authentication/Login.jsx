import React from 'react';
import './Authentication.css';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { BlogContext } from '../../context/Context';
import { useContext } from 'react';
import { useReducer, useRef } from 'react';


function Login() {

    const { dispatch } = useContext(BlogContext);
    const userRef = useRef();
    const passwordRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(userRef.current.value);
        dispatch({ type: 'LOGIN_START' });
        try {
            const response = await axios.post('/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value
            });

            if (response.data !== 'Wrong credentials!') {
                dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
                console.log('You are logged in now!');
            }
            else {
                console.log(response.data);
            }

        }
        catch (e) {
            dispatch({ type: 'LOGIN_FAILURE' });
            console.log('error during login!');
            console.log(e);
        }
    };


    return (
        <>
            <Navbar />

            <div className='authContainer'>

                <div className="authCredentials">

                    <form onSubmit={submitHandler}>

                        <div className="authTitle">
                            Login
                        </div>


                        <div className="authInput">
                            <label>Username</label>
                            <input type="text" ref={userRef} placeholder='parth' />

                            <label>Password</label>
                            <input type="password" ref={passwordRef} />
                        </div>

                        <div className="authSubmit">
                            <button>LOGIN</button>
                        </div>

                    </form>

                </div>

            </div>

        </>
    );
}

export default Login;
