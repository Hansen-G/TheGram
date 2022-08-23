import React, { useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { loadHomePage } from "../../store/images";

import './HomePage.css'

function cut(str) {
    return str.substring(0, 100) + '...';
}

function pastDate(date) {
    
    const now = new Date();
    const then = new Date(date);
    const diff = now - then;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        return 'Today';
    } else {
        return diffDays + ' days ago';
    }
}

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(loadHomePage(user.id));
    }, [dispatch]);

    const images = useSelector((state) => state.images);
    if (!images || Object.keys(images).length === 0) {
        return null;
    }
    const imagesArr = Object.values(images)

    console.log(imagesArr)
    const handleSubmit = async (e) => {

    }





    return (
        <div className='home'>

            <div className='home-left flex'>
                {imagesArr.length > 0 &&
                    imagesArr.map((image) => (
                        <div className="card-post-container" key={image.id}>

                            <div className='post-user-info flex'>
                                <div className='profile-image-div'>
                                    <img src={image.post_user.profile_image} className="profile-image"></img>
                                </div>
                                <div className='post-user-name-div flex'>
                                    <Link to={`/${image.post_user.id}`}>
                                        <div>{image.post_user.username}</div>
                                    </Link>
                                    {
                                        (image['location']) && (
                                            <div>
                                                {image.location}
                                            </div>
                                        )
                                    }
                                       
                                </div>
                            </div>
                            <div className='post-image'>
                                <img src={image.url} className="post-image-detail"></img>
                            </div>
                            <div className='post-info'>
                                <div className='post-function-bar'>
                                    <div className='post-function-bar-left'>
                                        <i className="fa-regular fa-heart"></i>
                                        <i className="fa-regular fa-comment"></i>
                                        <i className="fa-regular fa-paper-plane"></i>
                                    </div>
                                    <div className='post-function-bar-right'>
                                        <i className="fa-regular fa-bookmark"></i>
                                    </div>    
                                </div>
                                <div className='image-likes'>
                                    {image.user_image_likes} likes
                                </div>
                                {
                                    (image['description'].length <= 100 ) && (
                                        <div>
                                            <a className=''>{image.post_user.username}</a> 
                                            <a> {image.description}</a>
                                        </div>
                                    ) 
                                }
                                {
                                    (image['description'].length > 100) && (
                                        <div>
                                            <a className=''>{image.post_user.username}</a>
                                            <a> {cut(image.description)}</a>
                                        </div>
                                    ) 
                                }
                               
                            </div>
                            <div className='post-date'>
                                {pastDate(image.createdAt)}
                            </div>
                            <div className='post-add-comment'>
                                <i className="fa-regular fa-face-smile"></i>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Add a comment...' value={comment} onChange={e => setComment(e.target.value)}></input>
                                    <button type="submit" disabled={comment.length===0} className={comment.length > 0 ? 'disabled' : 'enabled'} id='editgroup'>Post</button>
                                </form>
                            </div>
                                    
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default HomePage;