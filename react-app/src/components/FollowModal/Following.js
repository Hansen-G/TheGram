import "./index.css";
import { toggleUserFollow } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Following = ({ user, setUser }) => {
	const dispatch = useDispatch();
	let path = useLocation();
	let userId = Number(path.pathname.split("/")[1]);
	const session = useSelector((state) => state.session);
	const { following_id, profile_img, username } = user;

	const toggleAUserFollow = async (userToFollowId) => {
		await dispatch(toggleUserFollow(userToFollowId));
		getUser();
	};

	const getUser = async () => {
		let profileUser = await fetch(`/api/users/${userId}`);
		const data = await profileUser.json();
		if (data.error) return;
		else setUser(data);
	};

	return (
		<div className="modal-follow">
			<Link to={`/${following_id}`}>
				<img
					src={profile_img}
					className="modal-like-profile-image"
					alt='profile'
				></img>
			</Link>
			<Link to={`/${following_id}`}>{username}</Link>
			{session.user &&
				!(Number(user.following_id) === Number(session.user.id)) &&
				(session.user.following[following_id] ? (
					<button
						onClick={() => {
							toggleAUserFollow(following_id);
						}}
						className="toggle-follow submit-btn following"
					>
						<svg
							aria-label="following"
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
						onClick={() => toggleAUserFollow(following_id)}
						className="toggle-follow submit-btn follow"
					>
						Follow
					</button>
				))}
			{session.user &&
				Number(session.user.id) === Number(following_id) && (
					<div className="follow-placeholder"></div>
				)}
		</div>
	);
};

export default Following;
