import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadImages } from "../../store/images";
import { toggleUserFollow } from "../../store/session";
import FollowModal from "../FollowModal";
import Post from "./Post";
import "./css/Profile.css";

const Profile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	let path = useLocation();
	let userId = Number(path.pathname.split("/")[1]);
	const [user, setUser] = useState();
	const images = Object.values(useSelector((state) => state.images));
	const currentUser = useSelector((state) => state.session.user);
	const [loaded, setLoaded] = useState(false);
	const [showFollowModal, setShowFollowModal] = useState(false);
	const [type, setType] = useState("");
	//Fetch user data
	// const getUser = async () => {
	// 	let newuser = await fetch(`/api/users/${userId}`);

	// 	let data = await newuser.json();
	// 	setUser(data);
	// };
	const getUser = async () => {
		if (!Number(userId) || userId === 0) {
			return history.push("/");
		}
		// if (currentUser.id === userId) {
		// 	setUser(currentUser);
		// } else {
		let profileUser = await fetch(`/api/users/${userId}`);
		const data = await profileUser.json();
		if (data.error) return history.push("/");
		else setUser(data);
		// }
	};

	const toggleAUserFollow = async (userToFollowId) => {
		await dispatch(toggleUserFollow(userToFollowId));
		await getUser();
	};

	useEffect(() => {
		if (path.pathname.split("/").length > 2) {
			return history.push("/");
		}
		if (Number(userId)) {
			dispatch(loadImages(userId));
			getUser();
		} else {
			return history.push("/");
		}
		window.scrollTo(0, 0);
		// dispatch(loadImages(userId));
		//Call backend
	}, [dispatch, userId]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoaded(true);
		}, 250);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			{loaded && user && (
				<div className="profile-master-div">
					<div className="user-info">
						<div className="profile-image-container">
							<img
								className="profile-image-bio"
								src={user.profile_img}
								alt="profile"
							/>
						</div>
						<div className="profile-stats">
							<div className="username-and-follow-toggle">
								<h2 className="profile-username">
									{user.username}
								</h2>
								{!(
									Number(currentUser.id) === Number(user.id)
								) &&
									(currentUser.following[user.id] ? (
										<button
											onClick={() => {
												toggleAUserFollow(user.id);
											}}
											className="toggle-follow submit-btn following"
										>
											<svg
												aria-label="Following"
												className="ab6-"
												color="#262626"
												fill="#262626"
												height="15"
												role="img"
												viewBox="0 0 95.28 70.03"
												width="20"
											>
												<path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 0zm19-50.8A19 19 0 1164.32 0a19.05 19.05 0 0118.91 19.18zM14.76 50.01a5 5 0 01-3.37-1.31L.81 39.09a2.5 2.5 0 01-.16-3.52l3.39-3.7a2.49 2.49 0 013.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 013.52 0l3.53 3.58a2.49 2.49 0 010 3.52L18.23 48.57a5 5 0 01-3.47 1.44z"></path>
											</svg>
										</button>
									) : (
										<button
											onClick={() =>
												toggleAUserFollow(user.id)
											}
											className="toggle-follow submit-btn follow"
										>
											Follow
										</button>
									))}
							</div>

							<div className="inner-user-info">
								<div className="inner-user-info-stat">
									{" "}
									<span className="bold-text">
										{images.length}{" "}
									</span>
									posts{" "}
								</div>
								<div
									className="inner-user-info-stat follow"
									onClick={() => {
										if (
											Object.values(user.followers)
												.length === 0
										)
											return;
										if (!showFollowModal) {
											setType("Followers");
											setShowFollowModal(true);
										}
									}}
								>
									{" "}
									<span className="bold-text">
										{Object.values(user.followers).length}{" "}
									</span>
									followers
								</div>
								<div
									className="inner-user-info-stat follow"
									onClick={() => {
										if (
											Object.values(user.following)
												.length === 0
										)
											return;
										if (!showFollowModal) {
											setType("Following");
											setShowFollowModal(true);
										}
									}}
								>
									<span className="bold-text ">
										{" "}
										{
											Object.values(user.following).length
										}{" "}
									</span>{" "}
									following
								</div>
								<FollowModal
									showFollowModal={showFollowModal}
									setShowFollowModal={setShowFollowModal}
									user={user}
									type={type}
									setUser={setUser}
								></FollowModal>
							</div>
							<div className="profile-name">{user.name}</div>
							<div className="profile-bio">{user.bio}</div>
						</div>
					</div>
					<div className="posts-container">
						{loaded &&
							images.length > 0 &&
							images.reverse().map((image) => {
								return (
									<Post post={image} key={image.id}></Post>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
