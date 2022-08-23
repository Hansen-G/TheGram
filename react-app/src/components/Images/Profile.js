import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadImages } from "../../store/images";
import Post from "./Post";
import "./css/Profile.css";

const Profile = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();
	const [user, setUser] = useState();

	useEffect(() => {
        dispatch(loadImages(userId));
        
        //Call backend
		getUser();
	}, [dispatch]);

    //Fetch user data
	const getUser = async () => {
		let newuser = await fetch(`/api/users/${userId}`);
		let data = await newuser.json();
		setUser(data);
	};

    const images = Object.values(useSelector((state) => state.images));

    //Way of accessing current user through session
	// const user = useSelector((state) => state.session.user);
	return (
		<>
			{user && (
				<div className="profile-master-div">
					<div className="user-info">
						<div className="profile-image-container">
							<img
								className="profile-image"
								src={user.profile_img}
							/>
						</div>
						<div className="profile-stats">
							<h2 className="profile-username">
								{user.username}
							</h2>

							<div className="inner-user-info">
								<div className="inner-user-info-stat">
									{" "}
									<span className="bold-text">
										{images.length}{" "}
									</span>
									posts{" "}
								</div>
								<div className="inner-user-info-stat">
									{" "}
									<span className="bold-text">
										{"placeholder"}{" "}
									</span>
									followers
								</div>
								<div className="inner-user-info-stat">
									<span className="bold-text">
										{" "}
										{
											Object.values(user.following).length
										}{" "}
									</span>{" "}
									following
								</div>
							</div>
							<div className="profile-name">{user.name}</div>
							<div className="profile-bio">{user.bio}</div>
						</div>
					</div>
					<div className="posts-container">
						{images.length > 0 &&
							images.map((image) => {
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
