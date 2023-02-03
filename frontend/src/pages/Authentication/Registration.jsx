import React from 'react';
import './Authentication.css';
import Navbar from '../../components/Navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';


function Registration() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/blog/api/auth/registration`, { username, email, password, userId: uuid(), userImg: 'sample.jpg' });
            return (response.data && window.location.replace('/login'));
        }
        catch (e) {
            setError(true);
            console.log('Cannot register!');
            console.log(e);
        }
    };

    return (
        <>
            <Navbar />

            <div className='authContainer'>

                <div className="authCredentials">

                    <div className="authTitle">
                        Sign Up
                    </div>

                    <form onSubmit={submitHandler}>

                        <div className="authInput">
                            <label>Username</label>
                            <input type="text" placeholder='parth' onChange={(e) => setUsername(e.target.value)} value={username} />

                            <label>Email</label>
                            <input type="email" placeholder='parth@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email} />

                            <label>Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        <div className="authSubmit">
                            <button type='submit'>SUBMIT</button>
                        </div>

                    </form>

                </div>

            </div>

        </>
    );
}

export default Registration;