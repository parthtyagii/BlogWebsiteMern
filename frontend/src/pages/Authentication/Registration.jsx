import React from 'react';
import './Authentication.css';
import Navbar from '../../components/Navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';


function Registration() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const response = await axios.post('/auth/registration', { username, email, password });
            console.log(response);
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
                        Registration
                    </div>

                    <form onSubmit={submitHandler}>

                        <div className="authInput">
                            <label>Username</label>
                            <input type="text" placeholder='parth' onChange={(e) => setUsername(e.target.value)} value={username} />

                            <label>Email</label>
                            <input type="text" placeholder='parth@gmail.com' onChange={(e) => setEmail(e.target.value)} value={email} />

                            <label>Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        <div className="authSubmit">
                            <button>REGISTER</button>
                        </div>

                    </form>

                </div>

            </div>

        </>
    );
}

export default Registration;