import React, { useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { loadHomePage } from "../../store/images";

import './ImageModal.css'

function cut(str) {
    return str.substring(0, 100) + '...';
}

function pastDate(date) {

    const now = new Date();
    const then = new Date(date);
    const diff = now - then;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diff / (1000 * 60));
            if (diffMinutes === 0) {
                const diffSeconds = Math.floor(diff / (1000));
                return `${diffSeconds} seconds ago`;
            }
            return `${diffMinutes} minutes ago`;
        }
        return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return '1 day ago';
    } else {
        return diffDays + ' days ago';
    }
}

function ImageDetails(image) {
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
        <div className="card-post-container flex" key={image.id}>

            <div className='post-user-info flex'>
                <div className='profile-image-div'>
                    <img src={image.post_user.profile_img} className="profile-image"></img>
                </div>
                <div className='post-user-name-div flex'>
                    <Link to={`/${image.post_user.id}`}>
                        <div className='post-user-name-div-username'>{image.post_user.username}</div>
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
                <div className='post-function-bar flex'>
                    <div className='post-function-bar-left'>
                        {
                            (image.curent_user_liked) && (
                                <i class="fa-solid fa-heart curent_user_liked"></i>
                            )
                        }
                        {
                            (!image.curent_user_liked) && (
                                <i className="fa-regular fa-heart"></i>
                            )
                        }

                        <i className="fa-regular fa-comment"></i>
                        <i className="fa-regular fa-paper-plane"></i>
                    </div>
                    {/* <div className='post-function-bar-right'>
                                        <i className="fa-regular fa-bookmark"></i>
                                    </div>     */}
                </div>
                <div className='image-likes'>
                    {image.user_image_likes} likes
                </div>
                {
                    (image['description'].length <= 100) && (
                        <div className='post-description'>
                            <Link to={`/${image.post_user.id}`}>
                                <a className='post-description-user'>{image.post_user.username}</a>
                            </Link>

                            <a className='post-description-detail'> {image.description}</a>
                        </div>
                    )
                }
                {
                    (image['description'].length > 100) && (
                        <div className='post-description'>
                            <Link to={`/${image.post_user.id}`}>
                                <a className='post-description-user'>{image.post_user.username}</a>
                            </Link>
                            <a className='post-description-detail'> {cut(image.description)}</a>
                        </div>
                    )
                }
                <div className='post-all-comments'>
                    View all {image.comments.length} comments
                </div>
                <div className='post-date'>
                    {pastDate(image.createdAt)}
                </div>
                <div className='div-line'></div>
                <div className='post-add-comment flex'>
                    <i className="fa-regular fa-face-smile"></i>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Add a comment...' value={comment} onChange={e => setComment(e.target.value)} className='post-comment-input'></input>
                        <button type="submit" disabled={comment.length === 0} className={comment.length === 0 ? 'disabled post-commit-submit' : 'enabled post-commit-submit'} id='editgroup'>Post</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default ImageDetails;