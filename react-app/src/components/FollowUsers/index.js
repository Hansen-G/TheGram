import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHomePage } from "../../store/images";
import { toggleUserFollow } from "../../store/session";
import "./FollowUsers.css";
const FollowUsers = () => {
	const dispatch = useDispatch();
	const [users, setUsers] = useState({});
	const [user, setUser] = useState();
	const [loaded, setLoaded] = useState(false);
	const currentUser = useSelector((state) => state.session.user);
	const userId = currentUser.id;

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(`/api/users/get-users`);
			const fetchedusers = await res.json();
			dispatch(loadHomePage(userId));
			setUsers(fetchedusers);
		};
		getData();
	}, [dispatch, user]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoaded(true);
		}, 250);
		return () => clearTimeout(timeout);
	}, []);

	//Fetch user data
	const getUser = async () => {
		let newuser = await fetch(`/api/users/${userId}`);
		let data = await newuser.json();
		setUser(data);
	};
	const toggleAUserFollow = async (currentUserId, userToFollowId) => {
		await dispatch(toggleUserFollow(userToFollowId));
		await getUser(userId);
	};

	return loaded && Object.values(users).length ? (
		<div className="followers-box">
			<h3>Suggested People to Follow</h3>
			<div>
				{users.length > 0
					? users.map((user) => (
							<div className="follow-card" key={user.id}>
						
								<img
									className="profile-image-follow-box"
									src={user.profile_img}
									alt="profile"
								/>
								<p className="p-follow-box">{user.username}</p>
								<button
									className="follow-box-button"
									onClick={() => {
										toggleAUserFollow(
											currentUser.id,
											user.id
										);
									}}
								>
									Follow
								</button>
							</div>
					  ))
					: null}
			</div>
		</div>
	) : (
		loaded && (
			<div className="no-users-follow-card">
				<h3>No Suggested People to Follow</h3>
			</div>
		)
	);
};

export default FollowUsers;
