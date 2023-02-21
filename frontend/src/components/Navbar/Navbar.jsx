import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../context/Context';
import { useContext, useState } from 'react';
import BlogLogo from '../../BlogLogo.jpg';


function Navbar() {

    const { user, dispatch } = useContext(BlogContext);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const logoutHandler = () => {
        dispatch({ type: 'LOGOUT' });
        window.location.replace('/');
    }

    const handleClick = () => {
        if (user === null) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
        }
        else {
            window.location.replace('/createBlog');
        }
    }

    return (
        <>
            <div className='navbar-container'>

                <div className="navbar-left">
                    <img src={BlogLogo} alt="blog_logo" />
                </div>

                <div className="navbar-middle">
                    <ul className='nav-mid-ul'>
                        <li className='navListItem'>
                            <Link to='/' className='link'>HOME</Link>
                        </li>
                        <li className='navListItem'>
                            <Link onClick={handleClick} className='link'>CREATE</Link>
                        </li>
                        <li className='navListItem'>
                            <a href='https://github.com/parthtyagii/BlogWebsiteMern' className='link'>GitHub</a>
                        </li>
                    </ul>
                </div>

                <div className="navbar-right">

                    {!user &&

                        <ul className='nav-right-ul'>
                            <li className='navListItem signIn'>
                                <Link to='/login' className='link'>Sign in</Link>
                            </li>
                            <li className='navListItem signUp'>
                                <button>
                                    <Link to='/register' className='link'>Sign up</Link>
                                </button>
                            </li>
                        </ul>
                    }

                    {user &&
                        <ul className="nav-right-ul">
                            <li className="navListItem logOut" onClick={logoutHandler}>
                                <button>Logout</button>
                            </li>
                            <li className="navListItem listImage">
                                <Link to={`/account/${user.userId}`} className='link'>
                                    <img src={user.userImg.secure_url} alt="image" />
                                </Link>
                            </li>
                        </ul>
                    }

                </div>

            </div>

            {error &&
                <div className="navMessage">
                    you are not logged in!
                </div>
            }

        </>
    );
}

export default Navbar;
