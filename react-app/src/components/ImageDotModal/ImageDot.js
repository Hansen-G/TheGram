import React, { useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toggleALike } from "../../store/images";
import { CreateComment } from '../../store/comments';
import { DeleteImage } from '../../store/images';
import ImageFormModal from "../ImageFormModal"


import './ImageDot.css'

function ImageDot({ setModal, image, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    
    const deleteListener = async (imageId) => {

        if (window.confirm('Do you really want to delete this Image? This action can not be undone!')) {
            const response = await dispatch(DeleteImage(imageId));
            if (response) {
                window.alert('Successfully deleted the Image, Click OK to bring you back to the home page');
                history.push(`/`);
            }
        }
    };
    
    console.log('Here', image)


    return (
        <div className='dot-modal'>
            <div className='card edit-image dot-bar flex'>
                Edit Image
            </div>
            <div className='div-line' id='model-div-line'></div>

            <div className='card delete-image dot-bar flex'>
                <button 
                    onClick={() => deleteListener(image.id)}
                    className='cancel-edit-button'
                >Delete</button>
            </div>
            <div className='div-line' id='model-div-line'></div>
            <div className='card cancel-image dot-bar flex'>
                <button onClick={() => {
                    setModal(false);
                }}
                className='cancel-edit-button'
                >Cancel</button>
            </div>
        </div>

    )
}



export default ImageDot