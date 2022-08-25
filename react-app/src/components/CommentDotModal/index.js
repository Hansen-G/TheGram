import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import CommentDot from './CommentDot'


function CommentDotModal({ comment, user }) {
    const [showModal, setShowModal] = useState(false);

    // function that returns setShwoMOdalfalse and pass as prop
    const setModal = (show) => setShowModal(show);
    return (
        <>

            <button className='comment-edit-botton' onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-ellipsis comment-dot-icon"></i>
                
            </button>
            {showModal && (
                <Modal id='post-model'

                    onClose={() => setShowModal(false)}
                    className='post-model'
                >
                    <CommentDot setModal={setModal} comment={comment} user={user} className='post-model' />
                </Modal>
            )}
        </>
    );
}

export default CommentDotModal;