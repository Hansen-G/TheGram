import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './ImageForm.css'

const ImageForm = ({action, onClose, imageId, setShowModal, showModal})=> {
    const dispatch = useDispatch()
    const images = useSelector(state => state.images)
    const user = useSelector(state=> state.session.user)
    const [url, setUrl] = useState()
    const [description, setDescription] = useState()
    const [alt_description, setAltDescription] = useState()
    const [show_stats, setShowStats] = useState(true)
    const [location, setLocation] = useState()
    const [errors, setErrors] = useState([])
    const [showAccessity, setShowAccessity] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const create_payload = {
            url,
            description,
            location,           
            alt_description,
            show_stats,
        }
        // const update_payload = {
        //     // id: imageId,
        //     description,
        //     location,
        //     alt_description,
        //     show_stats
        // }
        
        // if (action === 'Create new post') {
        //     dispatch()
        //     }
    }

    return (
        <div>
            <div>
                {/* <h3>{action}</h3> */}
                <button onClick={()=> setShowModal(false)}>Cancel</button>
                <button className="create_submit_button"
                    type="submit">
                        action='Create new post'? Share : Done
                    </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="image_form_container">
                    <div>
                        <span>{user.name}</span>
                        <span>{user.profile_img}</span>
                    </div>
                    <ul>
                        {errors.map((error, index)=>
                            <li key={index}>{error}</li>
                        )}
                    </ul>
                    <div className="url">
                        <input 
                            value = {url}
                            onChange= {e => setUrl(e.target.value)}
                            placeholder = "Crate a image..."
                            type='url'
                            maxLength='250'
                            required
                        />
                    </div>
                    <div className="description">
                        <input 
                            value = {description}
                            onChange= {e => setDescription(e.target.value)}
                            placeholder = "Write a caption..."
                            type='text'
                            maxLength="2200"
                        />
                    </div>
                    <div className="location">
                        <input
                            value = {location}
                            onChange = {e=> setLocation(e.target.value)}
                            placeholder = 'Add Location'
                            type="text"
                            maxLength='250'
                        />
                    </div>
                    <div className="alt_description">
                        <div>
                            <div> Accessibility </div>
                            <button onClick={()=>setShowAccessity(true)}>
                                <i className="fa-solid fa-angle-up"></i>
                            </button>
                        </div>
                        showAccessity && <div>
                            <div>
                                Alt text describes your photos for people with visual impairments. Alt text will be automatically created for your photos or you can choose to write your own.
                            </div>
                            <input 
                                value = {alt_description}
                                onChange= {e => setAltDescription(e.target.value)}
                                placeholder = "Write alt text..."
                                type='text'
                                maxLength="2200"
                            />
                        </div>
                    </div>

                </div>
                
            </form>

        </div>
    )
}

export default ImageForm