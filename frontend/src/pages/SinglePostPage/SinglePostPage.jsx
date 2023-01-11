import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './SinglePostPage.css';


function SinglePostPage() {
    return (
        <>
            <Navbar />

            <div className="singlePostContainer">

                <div className="singlePostImg">
                    <img src="https://wallpaperaccess.com/full/780293.jpg" alt="" />
                </div>

                <div className="singlePostTitle">

                    <div className="singlePostTitleText">
                        JENNIFER LAWRENCE
                    </div>

                    <div className="singlePostEdit">
                        <button><i class="editIcon fa-regular fa-pen-to-square"></i></button>
                        <button><i class="editIcon fa-solid fa-trash-can"></i></button>
                    </div>
                    
                </div>

                <div className="singlePostDesc">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam optio dolore quae?
                    Accusamus quos magni delectus deserunt nulla quidem, animi consectetur similique,
                    perferendis aperiam consequuntur numquam, quisquam vel! Iure, delectus.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam optio dolore quae?
                    Accusamus quos magni delectus deserunt nulla quidem, animi consectetur similique,
                    perferendis aperiam consequuntur numquam, quisquam vel! Iure, delectus.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam optio dolore quae?
                    Accusamus quos magni delectus deserunt nulla quidem, animi consectetur similique,
                    perferendis aperiam consequuntur numquam, quisquam vel! Iure, delectus.
                </div>

                <div className="singlePostAuthor">
                    Author : <span>PARTH TYAGI</span>
                </div>

            </div>
        </>
    )
}

export default SinglePostPage;
