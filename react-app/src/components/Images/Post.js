import { useState } from "react";
import "./css/ProfilePost.css";
import ProfileImageModal from "../ProfileImageModal/index";

const Post = ({ post }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="single-post-container">
			<div onClick={() => setShowModal(true)}>
				<img src={post.url} className="profile-post" alt="post"></img>
			</div>
			{showModal && (
				<ProfileImageModal
					showModal={showModal}
					setShowModal={setShowModal}
					image={post}
				></ProfileImageModal>
			)}
		</div>
	);
};

export default Post;
