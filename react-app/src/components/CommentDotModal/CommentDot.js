import React, { useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toggleALike } from "../../store/images";
import { CreateComment } from '../../store/comments';
import { EditComment, DeleteComment  } from '../../store/images';


import './CommentDot.css'

function CommentDot({ setModal, comment, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [commentToBeEdited, setCommentToBeEdited] = useState(comment.comment)
    
    
    const deleteListener = async (commentId, imageId) => {

        if (window.confirm('Do you really want to delete this Comment? This action can not be undone!')) {
            const response = await dispatch(DeleteComment(commentId, imageId));
            if (response) {
                window.alert('Successfully deleted the Comment');
                setModal(false)
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const editedComment = {
            comment: commentToBeEdited,
            commentId: comment.id,
            imageId: comment.image_id
        };
        dispatch(EditComment(editedComment));
        setModal(false)

    }



    return (
        <div className='dot-modal'>
            <div className='edit-image dot-bar flex'>
                <form onSubmit={handleSubmit} action='PUT'>
                    <label>Edit Comment
                        <textarea 
                            placeholder="More than 1000 characters" 
                            type={'text'} row='6' 
                            id='dot-edit-comment' 
                            value={commentToBeEdited} 
                            onChange={e => setCommentToBeEdited(e.target.value)}>

                        </textarea>
                    </label>
                    <button
                        type="submit"
                        disabled={commentToBeEdited.length === 0}
                        className={
                            commentToBeEdited.length === 0
                                ? "disabled post-commit-submit"
                                : "enabled post-commit-submit"
                        }
                        id="editgroup"
                    >
                        Post
                    </button>
                </form>
            </div>
            <div className='div-line' id='model-div-line'></div>

            <div className='delete-image dot-bar flex'>
                <button 
                    onClick={() => deleteListener(comment.id, comment.image_id)}
                    className='cancel-edit-button'
                >Delete</button>
            </div>
            <div className='div-line' id='model-div-line'></div>
            <div className='cancel-image dot-bar flex'>
                <button onClick={() => {
                    setModal(false);
                }}
                className='cancel-edit-button'
                >Cancel</button>
            </div>
        </div>

    )
}



export default CommentDot