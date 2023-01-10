import React from 'react';
import './Navbar.css';



function Navbar() {
    return (
        <div className='navbar-container'>
            
            <div className="navbar-left">BLOG</div>

            <div className="navbar-middle">
                <ul className='nav-mid-ul'>
                    <li className='navListItem'>HOME</li>
                    <li className='navListItem'>CREATE</li>
                </ul>
            </div>

            <div className="navbar-right">

                {/* <ul className='nav-right-ul'>
                    <li className='navListItem'>LOGIN</li>
                    <li className='navListItem'>REGISTER</li>
                </ul> */}

                <ul className="nav-right-ul">
                    <li className="navListItem">LOGOUT</li>
                    <li className="navListItem">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF2O_c-gKI_IdbvA5TwW0mFgO-IXt784J7TQ&usqp=CAU" alt="" />
                    </li>
                </ul>

            </div>

        </div>
    );
}

export default Navbar;
