import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import ImageDot from './ImageDot'
import './ImageForm.css'

function mageDotModal({imageId, showModal, setShowModal, image}) {
    // const [showModal, setShowModal] = useState(true)

    return (
        <div>
            {/* <button className='create_a_image_button' >
                {action}
            </button> */}
            {showModal && (
                // <div>hihihi </div>
                <Modal onClose={()=> setShowModal(false)}>
                    <ImageDot imageId={imageId} setShowModal={setShowModal} showModal={showModal} image={image} />
                </Modal>
            )}
        </div>
    )
}



export default mageDotModal