import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHomePage } from "../../store/images";
import { toggleUserFollow } from "../../store/session";
import "./FollowUsers.css";
import { Link } from "react-router-dom";


const FollowUsers = ({ passuser }) => {
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
	}, [user]);

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


			<div className="home-user-card flex">
				<div className="home-user-card-img-div">
					<Link to={`/${passuser.id}`}>
						<img
							src={passuser.profile_img}
							className="home-user-card-img"
							alt="profile"
						></img>
					</Link>
					
				</div>
				<div className="home-user-card-name">
					<Link to={`/${passuser.id}`}>
						<div className="home-user-card-username">{passuser.username}</div>
						<div className="home-user-card-name-place">{passuser.name}</div>
					</Link>
					
				</div>
			</div>
			<p className="home-suggestion">Suggestions For You</p>
			<div>
				{users.length > 0
					? users.map((user) => (
							<div className="follow-card" key={user.id}>
							<Link to={`/${user.id}`}>
								<img
									className="profile-image-follow-box"
									src={user.profile_img}
								/>
							</Link>
							<Link to={`/${user.id}`}>
								<div className="p-follow-box">
									<div className="home-user-card-username">{user.username}</div>
									<div className="home-suggest-for-you">Suggested for you</div>
								</div>
							</Link>
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
			<div className="copy-right flex">
				© 2022 THEGRAMME FROM
				<a href="https://github.com/Hansen-G/TheGramme" className="copy-right-name">About</a>
				<a href="https://github.com/huifeng248" className="copy-right-name">Abby Feng</a>
				<a href="https://github.com/nullgar" className="copy-right-name">Jonatan Aguilar</a>
				<a href="https://github.com/yonilurie" className="copy-right-name">Yoni Lurie</a>
				<a href="https://github.com/Hansen-G" className="copy-right-name">Hansen Guo</a>
			</div>
		</div>
	) : (
		loaded && (
			<div className="followers-box">
					<div className="home-user-card flex">
						<div className="home-user-card-img-div">
							<Link to={`/${passuser.id}`}>
								<img
									src={passuser.profile_img}
									className="home-user-card-img"
									alt="profile"
								></img>
							</Link>

						</div>
						<div className="home-user-card-name">
							<Link to={`/${passuser.id}`}>
								<div className="home-user-card-username">{passuser.username}</div>
								<div className="home-user-card-name-place">{passuser.name}</div>
							</Link>

						</div>
					</div>
				<p className="home-suggestion">No suggestion for you now</p>
				<p className="home-suggestion">Please check it later...</p>
				<div className="copy-right flex">
					© 2022 THEGRAMME FROM 
						<a href="https://github.com/Hansen-G/TheGramme" className="copy-right-name">About</a>
						<a href="https://github.com/huifeng248" className="copy-right-name">Abby Feng</a>
						<a href="https://github.com/nullgar" className="copy-right-name">Jonatan Aguilar</a>
						<a href="https://github.com/yonilurie" className="copy-right-name">Yoni Lurie</a>
						<a href="https://github.com/Hansen-G" className="copy-right-name">Hansen Guo</a>
				</div>
			</div>
		)
	);
};

export default FollowUsers;
