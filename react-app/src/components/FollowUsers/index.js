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

	return (
		<div className="followers-box">
			{loaded && user && Object.values(users).length ? (
				<>
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
								<div className="home-user-card-username">
									{passuser.username}
								</div>
								<div className="home-user-card-name-place">
									{passuser.name}
								</div>
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
												alt="profile"
											/>
										</Link>
										<Link to={`/${user.id}`}>
											<div className="p-follow-box">
												<div className="home-user-card-username">
													{user.username}
												</div>
												<div className="home-suggest-for-you">
													Suggested for you
												</div>
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
				</>
			) : (
				passuser && (
					<>
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
									<div className="home-user-card-username">
										{passuser.username}
									</div>
									<div className="home-user-card-name-place">
										{passuser.name}
									</div>
								</Link>
							</div>
						</div>
						<p className="home-suggestion">
							No More users to follow
						</p>
					</>
				)
			)}
			<div className="copy-right flex">
				2022 THEGRAMME
				<a
					href="https://github.com/Hansen-G/TheGramme"
					className="copy-right-name"
				>
					The Development Team
				</a>
				<div className="contact-container">
					<h2
						href="https://github.com/huifeng248"
						className="copy-right-name"
					>
						Abby Feng
					</h2>
					<a
						href="https://www.linkedin.com/in/hui-abby-feng-cpa/"
						className="contact-link"
					>
						<i className="fa-brands fa-linkedin"></i>
					</a>

					<a
						href="https://github.com/huifeng248"
						className="contact-link"
					>
						<i className="fa-brands fa-square-github"></i>
					</a>
				</div>
				<div className="contact-container">
					<h2
						href="https://github.com/nullgar"
						className="copy-right-name"
					>
						Jonatan Aguilar
					</h2>
					<a
						href="https://www.linkedin.com/in/jon-aguilar/"
						className="contact-link"
					>
						<i className="fa-brands fa-linkedin"></i>
					</a>

					<a
						href="https://github.com/nullgar"
						className="contact-link"
					>
						<i className="fa-brands fa-square-github"></i>
					</a>
				</div>
				<div className="contact-container">
					<h2 className="copy-right-name">Yoni Lurie</h2>
					<a
						href="https://www.linkedin.com/in/yonatan-lurie-464266203/"
						className="contact-link"
					>
						<i className="fa-brands fa-linkedin"></i>
					</a>
					<a
						href="https://github.com/yonilurie"
						className="contact-link"
					>
						<i className="fa-brands fa-square-github"></i>
					</a>
				</div>
				<div className="contact-container">
					<h2 className="copy-right-name">Hansen Guo</h2>
					<a
						href="https://www.linkedin.com/in/hansen-guo/"
						className="contact-link"
					>
						<i className="fa-brands fa-linkedin"></i>
					</a>

					<a
						href="https://github.com/Hansen-G"
						className="contact-link"
					>
						<i className="fa-brands fa-square-github"></i>
					</a>
				</div>
			</div>
		</div>
	);
};

export default FollowUsers;
