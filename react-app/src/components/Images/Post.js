import { useState } from "react";
// import { Link } from "react-router-dom";
import "./css/ProfilePost.css";
import ProfileImageModal from "../ProfileImageModal/index";
import ImageDetails from "../ImageModal/ImageDetails";
import ImageModal from "../ImageModal";

const Post = ({ post }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="single-post-container">

				{/* <ImageModal
				 	showModal={showModal}
					setShowModal={setShowModal}
					image={post}
					// user={user}
				>
				</ImageModal> */}
				<div onClick={() => setShowModal(true)}>
					<img src={post.url} className="profile-post"></img>
				</div>
				{showModal && <ProfileImageModal
					showModal={showModal}
					setShowModal={setShowModal}
					image={post}
				></ProfileImageModal>}


		</div>
	);
};

export default Post;
