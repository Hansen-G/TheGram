import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import ImageDetails from './ImageDetails';


function ImageModal() {
    const [showModal, setShowModal] = useState(false);

    // function that returns setShwoMOdalfalse and pass as prop
    const setModal = (show) => setShowModal(show);

    return (
        <>
            <button className='comments-botton' onClick={() => setShowModal(true)}>Comments</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ImageDetails setModal={setModal} />
                </Modal>
            )}
        </>
    );
}

export default ImageModal;