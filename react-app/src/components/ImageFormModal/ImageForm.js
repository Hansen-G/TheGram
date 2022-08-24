import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './ImageForm.css'
import { CreateImage, UpdateImage } from '../../store/images'

const ImageForm = ({ onClose, imageId, setShowModal, showModal, image}) => {
    const dispatch = useDispatch()
    const images = useSelector(state => state.images)
    // const image = Object.values(images).filter(image => image.id === imageId)
    // const image = images.imageId
    // Object.values(spots).filter(spot => spot?.ownerId === user?.id)
    const user = useSelector(state => state.session.user)
    const [url, setUrl] = useState()
    const [description, setDescription] = useState()
    const [alt_description, setAltDescription] = useState()
    const [show_stats, setShowStats] = useState(true)
    const [location, setLocation] = useState()
    const [action, setAction] = useState()
    const [errors, setErrors] = useState([])
    const [showAccessity, setShowAccessity] = useState(false)

    useEffect(() => {
        if (image) {
            setUrl(image.url)
            setDescription(image.description)
            setShowStats(image.show_stats)
            
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("******** handle submit")
        if (!image) {
            console.log("~~~~~~~~~~~create")
            const create_payload = {
                url,
                description,
                location,
                alt_description,
                show_stats,
            }
            dispatch(CreateImage(create_payload))
            .then(() => onClose())
            .catch(async (data) => {
                // const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        } else if (image) {
            const update_payload = {
                id: image.id,
                description,
                location,
                alt_description,
                show_stats
            }
            console.log("~~~~~~~~~~~update")
            dispatch(UpdateImage(update_payload))
                .then(() => onClose())
                .catch(async (data) => {
                    // const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
            })
        }
    }
    return (
        <div className="image_form_container">
            <form onSubmit={handleSubmit}>
                <div className="button_container">
                    <i className="fa-solid fa-arrow-left-long" onClick={() => {
                        setShowModal(false) 
                        setAction("Create new post")}}></i>
                    <div className="form_title">{image ? "Edit info" : "Create new post" }</div>
                    <button className="create_submit_button"
                        type="submit">
                        {image ? "Done" : "Share"}
                    </button>
                </div>
                <div className="image_form_container">
                    <div className="wrapper">


                        <div className="preview_image_place_holder">
                            {/* {image&&  */}
                            {/* <img src={image.url} alt='imageto be updated'></img>} */}
                        </div>
                        <div className="right_div_container">
                            <div className="user_profile_container">
                                <img className='user_profile_pic' src={user.profile_img} alt='profile image'></img>
                                <div>{user.name}</div>
                            </div>
                            <ul>
                                {errors.map((error, index) =>
                                    <li key={index}>{error}</li>
                                )}
                            </ul>
                            <div className="url">
                                <input
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    placeholder="Crate a image..."
                                    type='url'
                                    maxLength='250'
                                    required
                                />
                            </div>
                            <div className="description">
                                <input
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Write a caption..."
                                    type='text'
                                    maxLength="2200"
                                />
                            </div>
                            <div className="location">
                                <input
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder='Add Location'
                                    type="text"
                                    maxLength='250'
                                />
                            </div>
                            <div className="alt_description">
                                <div className="accessibility_container">
                                    <div> Accessibility </div>
                                    {showAccessity && <i className="fa-solid fa-angle-up" onClick={() => setShowAccessity(false)}></i>}
                                    {!showAccessity && <i className="fa-solid fa-chevron-down" onClick={() => setShowAccessity(true)}></i>}
                                </div>
                                {showAccessity && <div>
                                    <div className="accessibility_words">
                                        Alt text describes your photos for people with visual impairments. Alt text will be automatically created for your photos or you can choose to write your own.
                                    </div>
                                    <input
                                        value={alt_description}
                                        onChange={e => setAltDescription(e.target.value)}
                                        placeholder="Write alt text..."
                                        type='text'
                                        maxLength="2200"
                                    />
                                </div>}
                            </div>
                        </div>
                    </div>

                </div>

            </form>

        </div>
    )
}

export default ImageForm