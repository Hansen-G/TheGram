import { useState } from "react";
// import { Link } from "react-router-dom";
import "./css/ProfilePost.css";
import ProfileImageModal from "../ProfileImageModal/index";

const Post = ({ post }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="single-post-container">
			{showModal && (
				<ProfileImageModal
					showModal={showModal}
					setShowModal={setShowModal}
					post={post}
				></ProfileImageModal>
			)}
			<div onClick={() => setShowModal(true)}>
				<img src={post.url} className="profile-post"></img>
			</div>
		</div>
	);
};

export default Post;
