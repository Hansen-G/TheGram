import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import ImageForm from './ImageForm'
import './ImageForm.css'

function ImageFormModal({action, imageId, showModal, setShowModal}) {
    // const [showModal, setShowModal] = useState(true)

    return (
        <div>
            {/* <button className='create_a_image_button' >
                {action}
            </button> */}
            {showModal && (
                // <div>hihihi </div>
                <Modal onClose={()=> setShowModal(false)}>
                    <div>hihihi</div>
                    <ImageForm action={action} imageId={imageId} setShowModal={setShowModal} showModal={showModal} />
                </Modal>
            )}
        </div>
    )
}



export default ImageFormModal