import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import ImageForm from './ImageForm'
import './ImageForm.css'

function ImageFormModal({imageId, showModal, setShowModal, image, onClose}) {
    // const [showModal, setShowModal] = useState(true)

    return (
        <div>
            {/* <button className='create_a_image_button' >
                {action}
            </button> */}
            {showModal && (
                // <div>hihihi </div>
                <Modal onClose={()=> setShowModal(false)}>
                    <ImageForm imageId={imageId} setShowModal={setShowModal} showModal={showModal} image={image} onClose={onClose}/>
                </Modal>
            )}
        </div>
    )
}



export default ImageFormModal