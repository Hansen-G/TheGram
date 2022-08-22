import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadImages } from "../../store/images";
import Post from "./Post";
import './css/Profile.css'

const Profile = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadImages());
	}, [dispatch]);

	const images = Object.values(useSelector((state) => state.images));
	const user = useSelector((state) => state.session.user)

	return (
		<div className="profile-master-div">
		<div className="user-info">
			<div className="profile-image-container">
				<img className='profile-image'src={user.profile_img} />

			</div>
			<div>

				<h2 className="profile-username">
					{user.username}
				</h2>

				<div className="inner-user-info">
					<div><p>
							{images.length}
						</p> post
					</div>
					<div>Follwers</div>
					<div>{Object.values(user.following).length} following</div>

				</div>
				<div>{user.name}</div>
				<div>{user.bio}</div>

			</div>
		</div>
		<div className="posts-container">
			{images.length > 0 &&
				images.map((image) => {
					return <Post post={image} key={image.id}></Post>;
				})}
			{images.length > 0 &&
				images.map((image) => {
					return <Post post={image} key={image.id}></Post>;
				})}
		</div>
		</div>
	);
};

export default Profile;
