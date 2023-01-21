import React from 'react';
import './Authentication.css';
import Navbar from '../../components/Navbar/Navbar';



function Login() {

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            
        }
        catch (e) {
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
                            <input type="text" placeholder='parth' />

                            <label>Password</label>
                            <input type="password" />
                        </div>

                        <div className="authSubmit">
                            <button>LOGIN</button>
                        </div>

                    </form>

                    {/* <div className="authSwap">
                        <button>Are you registered?</button>
                    </div> */}

                </div>

            </div>

        </>
    );
}

export default Login;
