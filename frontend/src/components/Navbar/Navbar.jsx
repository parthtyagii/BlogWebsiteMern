import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../context/Context';
import { useContext } from 'react';

function Navbar() {

    const { user, dispatch } = useContext(BlogContext);

    const logoutHandler = () => {
        dispatch({ type: 'LOGOUT' });
        window.location.replace('/');
    }

    return (
        <div className='navbar-container'>

            <div className="navbar-left">BLOG</div>

            <div className="navbar-middle">
                <ul className='nav-mid-ul'>
                    <li className='navListItem'>
                        <Link to='/' className='link'>HOME</Link>
                    </li>
                    <li className='navListItem'>
                        <Link to='/createBlog' className='link'>CREATE</Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-right">

                {!user &&

                    <ul className='nav-right-ul'>
                        <li className='navListItem'>
                            <Link to='/login' className='link'>LOGIN</Link>
                        </li>
                        <li className='navListItem'>
                            <Link to='/register' className='link'>REGISTER</Link>
                        </li>
                    </ul>
                }

                {user &&
                    <ul className="nav-right-ul">
                        <li className="navListItem" onClick={logoutHandler}>LOGOUT</li>
                        <li className="navListItem">
                            <Link to='/account/1' className='link'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF2O_c-gKI_IdbvA5TwW0mFgO-IXt784J7TQ&usqp=CAU" alt="image" />
                            </Link>
                        </li>
                    </ul>
                }

            </div>

        </div>
    );
}

export default Navbar;
