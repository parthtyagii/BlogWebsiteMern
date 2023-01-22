import React from 'react';
import './AccountPage.css';
import Navbar from '../../components/Navbar/Navbar';





function AccountPage() {
    return (
        <>

            <Navbar />

            <div className="accountPageContainer">

                <div className="accountPageImg">
                    <img src="https://www.teahub.io/photos/full/298-2984607_jennifer-lawrence.jpg" alt="" />

                    <label htmlFor='accountPageProfilePic'>
                        <i className="fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id='accountPageProfilePic' />
                </div>

                <div className="accountPageCredentials">

                    <label>Username</label>
                    <input type="text" placeholder='Parth' />

                    <label>Email</label>
                    <input type="email" placeholder='parth@gmail.com' />

                    <label>Password</label>
                    <input type="password" />

                </div>

                <div className="accountPageUpdate">
                    <button>UPDATE</button>
                </div>

                <div className="accountPageDelete">
                    <button>DELETE ACCOUNT</button>
                </div>

            </div>

        </>
    );
}

export default AccountPage;
