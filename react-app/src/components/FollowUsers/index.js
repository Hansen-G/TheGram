import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadHomePage } from '../../store/images'
import { toggleUserFollow } from '../../store/session'
import './FollowUsers.css'
const FollowUsers = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [users, setUsers] = useState({})
    const [user, setUser] = useState()
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id


    // console.log(Object.values(currentUser.following).length === 0)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/users/get-users`);
            const fetchedusers = await res.json();
            await dispatch(loadHomePage(userId))
            setUsers(fetchedusers)
        })();
        return

    }, [user])
    console.log('test!!!!!!!!!!!!!!',currentUser)
    //Fetch user data
	const getUser = async () => {
		let newuser = await fetch(`/api/users/${userId}`);
		let data = await newuser.json();
		setUser(data);
	};
    const toggleAUserFollow = async (currentUserId, userToFollowId) => {
		await dispatch(toggleUserFollow(userToFollowId));
        await getUser(userId)

	};
    return (

        users && Object.values(currentUser.following).length && Object.values(users).length != 0 ?
        <div className='followers-box'>

        <h3>Suggested People to Follow</h3>
        <div>{ users.length > 0 ? users.map(user => (
            <div className='follow-card' key={user.id}>
                {/* {console.log(user)} */}
                <img className='profile-image-follow-box' src={user.profile_img} />
                <p className='p-follow-box'>{user.username}</p>
                <button className='follow-button' onClick={() => {
                    toggleAUserFollow(
                        currentUser.id,
						user.id
						)
                    }}>
                    Follow</button>
            </div>


        )): null}</div>
        </div>
            : <div className='no-users-follow-card' ><h3>No Suggested People to Follow</h3></div>
    )
}

export default FollowUsers
