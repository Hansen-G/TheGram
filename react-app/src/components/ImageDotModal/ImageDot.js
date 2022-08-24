import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './ImageForm.css'
import { CreateImage, UpdateImage } from '../../store/images'

const ImageDot = ({ onClose, imageId, setShowModal, showModal, image}) => {
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
        <div>
            Test
        </div>
    )
}

export default ImageDot