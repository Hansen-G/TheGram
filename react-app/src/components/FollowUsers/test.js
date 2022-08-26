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
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {

       dispatch(loadHomePage())

    }, [dispatch]);

    useEffect(() => {
		const timeout = setTimeout(() => {
				setLoaded(true);
		}, 250);
		return () => clearTimeout(timeout)
	}, [])


    const images = useSelector((state) => state.images);
    if (!images || Object.keys(images).length === 0) {
        return <FollowUsers />;
    }
    let imagesArr = Object.values(images).sort(function(a, b) {
        return new Date(b['createdAt']) - new Date(a['createdAt']);
    })

    return (
        <div className='home'>
            <FollowUsers />
            <div className='home-left flex'>
                {loaded && imagesArr.length > 0 &&
                    imagesArr.map((image) => (
                        <HomePageCard key={image.id} image={image} user={user} />
                    ))}
            </div>
        </div>
    );
}

export default HomePage;




// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { loadHomePage } from '../../store/images'
// import { toggleUserFollow } from '../../store/session'
// import './FollowUsers.css'
// const FollowUsers = () => {
//     const dispatch = useDispatch()
//     const [users, setUsers] = useState({})
//     const [user, setUser] = useState()
//     const [loaded, setLoaded] = useState(false)
//     const currentUser = useSelector((state) => state.session.user);
//     const userId = currentUser.id

//     useEffect(() => {
//         const getData = async () => {
//             const res = await fetch(`/api/users/get-users`);
//             const fetchedusers = await res.json();
//             dispatch(loadHomePage(userId))
//             setUsers(fetchedusers)
//         }
//         getData()
//     }, [user])

//     useEffect(() => {
//          const timeout = setTimeout(() => {
//                  setLoaded(true);
//          }, 250);
//          return () => clearTimeout(timeout)
//      }, [])

//     //Fetch user data
// 	const getUser = async () => {
// 		let newuser = await fetch(`/api/users/${userId}`);
// 		let data = await newuser.json();
// 		setUser(data);
// 	};
//     const toggleAUserFollow = async (currentUserId, userToFollowId) => {
// 		await dispatch(toggleUserFollow(userToFollowId));
//         await getUser(userId)

//     };
    

//     return (

//         loaded && Object.values(users).length ?
//         <div className='followers-box'>

//         <h3>Suggested People to Follow</h3>
//         <div>{ users.length > 0 ? users.map(user => (
//             <div className='follow-card' key={user.id}>
//                 {/* {console.log(user)} */}
//                 <img className='profile-image-follow-box' src={user.profile_img} />
//                 <p className='p-follow-box'>{user.username}</p>
//                 <button className='follow-box-button' onClick={() => {
//                     toggleAUserFollow(
//                         currentUser.id,
// 						user.id
// 						)
//                     }}>
//                     Follow</button>
//             </div>


//         )): null}</div>
//         </div>
//             : loaded && <div className='no-users-follow-card' ><h3>No Suggested People to Follow</h3></div>
//     )
// }

// export default FollowUsers