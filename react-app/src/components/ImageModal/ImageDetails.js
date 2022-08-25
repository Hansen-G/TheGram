import React, { useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { CreateComment } from '../../store/comments';

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

function ImageDetails({ image, user }) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    useEffect(() => {
        const newError = [];
        if (comment.length > 1000) {
            newError.push('Comment must be less than 1000 characters');
        }
    }, [comment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            comment: comment,
            image_id: image.id,
            user_id: user.id
        };
        dispatch(CreateComment(newComment, image.id));
        setComment('');
    }

    return (
        <div className="card-model-container flex" key={image.id}>

            <div className='model-image'>
                <img src={image.url} id="model-image-detail"></img>
            </div>
            <div className='model-info flex'>
                <div className='model-user-info flex'>
                    <div className='model-profile-image-div'>
                        <img src={image.post_user.profile_img} className="profile-image"></img>
                    </div>
                    <div className='model-user-name-div flex'>
                        <Link to={`/${image.post_user.id}`}>
                            <div className='model-user-name-div-username model-description-user'>{image.post_user.username}</div>
                        </Link>
                        {
                            (image['location']) && (
                                <div className='post-location'>
                                    {image.location}
                                </div>
                            )
                        }

                    </div>
                </div>

                <div className='div-line' id='model-div-line'></div>

                <div className='modal-all-comments flex'>
                    <div className='model-user-info-description flex' id='model-user-info-description'>
                        <div className='model-profile-image-div'>
                            <img src={image.post_user.profile_img} className="profile-image"></img>
                        </div>
                        <div className='model-user-name-div flex'>
                            <div className='model-comments'>
                                <Link to={`/${image.post_user.id}`}>
                                    <a className='model-description-user'>{image.post_user.username}</a>
                                </Link>
                                <a className='model-description-detail'> {image.description}</a>
                            </div>
                        </div>
                    </div>
                    {
                        (image['comments']) && image['comments'].map((comment) => (
                            <div className='model-user-info-description flex' id='model-user-info-description'>
                                <div className='model-profile-image-div'>
                                    <img src={comment.user.profile_img} className="profile-image"></img>
                                </div>
                                <div className='model-user-name-div flex'>
                                    <div className='model-comments'>
                                        <Link to={`/${comment.user.id}`}>
                                            <a className='model-description-user'>{comment.user.username}</a>
                                        </Link>
                                        <a className='model-description-detail'> {comment.comment}</a>
                                    </div>

                                </div>
                            </div>
                        ))
                    }

                </div>

                

                <div className='div-line' id='model-div-line'></div>

                <div className='post-function-bar flex'>
                    <div className='post-function-bar-left'>
                        {
                            (image.curent_user_liked) && (
                                <i className="fa-solid fa-heart curent_user_liked"></i>
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

                <div className='modal-date'>
                    {pastDate(image.createdAt)}
                </div>
                
                <div className='post-add-comment flex' id='post-add-comment'>
                    <i className="fa-regular fa-face-smile"></i>
                    <form onSubmit={handleSubmit} className='modal-comment-form'>
                        <input type="text" placeholder='Add a comment...' value={comment} onChange={e => setComment(e.target.value)} className='modal-comment-input'></input>
                        <button type="submit" disabled={comment.length === 0} className={comment.length === 0 ? 'disabled post-commit-submit' : 'enabled post-commit-submit'} id='editgroup'>Post</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default ImageDetails;
