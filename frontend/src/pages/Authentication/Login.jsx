import React from 'react';
import './Authentication.css';
import Navbar from '../../components/Navbar/Navbar';



function Login() {
    return (
        <>
            <Navbar />

            <div className='authContainer'>

                <div className="authCredentials">

                    <div className="authTitle">
                        Login
                    </div>

                    <div className="authInput">
                        <label>Username</label>
                        <input type="text" placeholder='parth'/>

                        <label>Password</label>
                        <input type="password" />
                    </div>

                    <div className="authSubmit">
                        <button>LOGIN</button>
                    </div>

                    <div className="authSwap">
                        <button>Are you registered?</button>
                    </div>

                </div>

            </div>

        </>
    );
}

export default Login;
