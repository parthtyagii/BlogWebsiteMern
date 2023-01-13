import React from 'react';
import './Authentication.css';
import Navbar from '../../components/Navbar/Navbar';


function Registration() {
    return (
        <>
            <Navbar />

            <div className='authContainer'>

                <div className="authCredentials">

                    <div className="authTitle">
                        Registration
                    </div>

                    <div className="authInput">
                        <label>Username</label>
                        <input type="text" placeholder='parth' />

                        <label>Email</label>
                        <input type="text" placeholder='parth@gmail.com'/>

                        <label>Password</label>
                        <input type="password" />
                    </div>

                    <div className="authSubmit">
                        <button>REGISTER</button>
                    </div>

                    <div className="authSwap">
                        <button>Already registered?</button>
                    </div>

                </div>

            </div>

        </>
    );
}

export default Registration;