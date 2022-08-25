import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './FollowUsers.css'
const FollowUsers = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [users, setUsers] = useState({})
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id

    // console.log(Object.values(currentUser.following).length === 0)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/users/get-users`);
            const fetchedusers = await res.json();

            setUsers(fetchedusers)
        })();


    }, [])

    console.log(users)
    return (

        <div className='followers-box'>{Object.values(currentUser.following).length < 3 && users && users['users'] ? Object.values(users['users']).map(user => (
            <>
            'Test'
            {/* {console.log(currentUser.following[user.id])}
            {currentUser.following[users.id] == undefined ?
                <div key={user.id}>
                    {user.username} <button>Follow</button>
                </div>
                : null
            } */}
            </>

            // { currentUser.following === undefined ?
            // <div key={user.id}>
            //     {user.name} <button>Follow</button>
            // </div>
            // : null
            // }
            // <div>{}</div>
        )): null}</div>
    )
}

export default FollowUsers
