import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import ImageDot from './ImageDot'


function ImageDotModal({ image, user }) {
    const [showModal, setShowModal] = useState(false);

    // function that returns setShwoMOdalfalse and pass as prop
    const setModal = (show) => setShowModal(show);
    return (
        <>

            <button className='edit-botton' onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-ellipsis dot-icon"></i>
            </button>
            {showModal && (
                <Modal id='post-model'

                    onClose={() => setShowModal(false)}
                    className='post-model'
                >
                    <ImageDot setModal={setModal} image={image} user={user} className='post-model' />
                    
                </Modal>
            )}
        </>
    );
}

export default ImageDotModal;