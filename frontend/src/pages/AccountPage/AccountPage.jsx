import React from 'react';
import './AccountPage.css';
import Navbar from '../../components/Navbar/Navbar';
import { BlogContext } from '../../context/Context';
import { useContext } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';




function AccountPage() {

    const url = 'http://localhost:5000/profileImages/';

    const { user, dispatch } = useContext(BlogContext);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [file, setFile] = useState(null);


    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_START' });
        const newFormData = {
            username: newUsername,
            email: newEmail,
            password: newPassword,
        };

        //image upload
        if (file) {
            try {
                const formData = new FormData();
                const fileName = Date.now() + file.name;
                formData.append('name', fileName);
                formData.append('file', file);
                newFormData.userImg = fileName;

                const response = await axios.post('/profileImg', formData);
                console.log(response.data);
            }
            catch (e) {
                console.log('cannot upload profile pic!');
                console.log(e);
            }
        }

        //update
        try {
            const response = await axios.put(`/user/${user.userId}`, newFormData);
            console.log(response.data);
            dispatch({ type: 'UPDATE_SUCCESS', payload: response.data });
            window.location.replace(`/account/${user.userId}`);
        }
        catch (e) {
            dispatch({ type: 'UPDATE_FAILURE' });
            console.log('cannot update profile!');
            console.log(e);
        }
    }

    const deleteHandler = async (e) => {
        try {
            const response = await axios.delete(`/user/${user.userId}`);
            dispatch({ type: 'LOGOUT' });
        }
        catch (e) {
            console.log('cannot delete account!');
            console.log(e);
        }
    }


    useEffect(() => {
        if (newUsername === '') {
            setNewUsername(user.username);
        }

        if (newEmail === '') {
            setNewEmail(user.email);
        }

        if (newPassword === '') {
            setNewPassword(user.password);
        }

    }, [newUsername, newEmail, newPassword, file]);


    return (
        <>

            <Navbar />

            <div className="accountPageContainer">

                <form onSubmit={submitHandler} encType="multipart/form-data">

                    <div className="accountPageImg">
                        {file &&
                            <img src={URL.createObjectURL(file)} alt="user_image" />
                        }

                        {!file &&
                            <img src={url + user.userImg} alt="user_image" />
                        }


                        <label htmlFor='accountPageProfilePic'>
                            <i className="fa-solid fa-plus"></i>
                        </label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" name='accountPic' id='accountPageProfilePic' />
                    </div>


                    <div className="accountPageCredentials">

                        <label>Username</label>
                        <input type="text" onChange={(e) => setNewUsername(e.target.value)} placeholder={`${user.username}`} />

                        <label>Email</label>
                        <input type="email" onChange={(e) => setNewEmail(e.target.value)} placeholder={`${user.email}`} />

                        <label>Password</label>
                        <input type="password" onChange={(e) => setNewPassword(e.target.value)} />

                    </div>

                    <div className="accountPageUpdate">
                        <button onSubmit={submitHandler}>UPDATE</button>
                    </div>

                </form>

                <div className="accountPageDelete">
                    <button onClick={deleteHandler}>DELETE ACCOUNT</button>
                </div>

            </div>

        </>
    );
}

export default AccountPage;
