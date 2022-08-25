import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadHomePage } from "../../store/images";
import ImageModal from '../ImageModal/';

import {CreateComment} from '../../store/images';
import HomePageCard from '../HomePageCard';

import './HomePage.css'
import FollowUsers from "../FollowUsers";



function cut(str) {
	return str.substring(0, 100) + "...";
}

function pastDate(date) {
	const now = new Date();
	const then = new Date(date);
	const diff = now - then;
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (diffDays === 0) {
		const diffHours = Math.floor(diff / (1000 * 60 * 60));
		if (diffHours === 0) {
			const diffMinutes = Math.floor(diff / (1000 * 60));
			if (diffMinutes === 0) {
				const diffSeconds = Math.floor(diff / 1000);
				return `${diffSeconds} seconds ago`;
			}
			return `${diffMinutes} minutes ago`;
		}
		return `${diffHours} hours ago`;
	} else if (diffDays === 1) {
		return "1 day ago";
	} else {
		return diffDays + " days ago";
	}
}

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(loadHomePage(user.id));
    }, [dispatch]);



    const images = useSelector((state) => state.images);
    if (!images || Object.keys(images).length === 0) {
        return null;
    }
    let imagesArr = Object.values(images).sort(function(a, b) {
        return new Date(b['createdAt']) - new Date(a['createdAt']);
    })

    return (
        <div className='home'>

            <FollowUsers />
            <div className='home-left flex'>
                {imagesArr.length > 0 &&
                    imagesArr.map((image) => (
                        <HomePageCard key={image.id} image={image} user={user} />
                    ))}
            </div>
        </div>
    );
}

export default HomePage;
