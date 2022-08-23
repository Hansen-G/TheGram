import { Link } from "react-router-dom";
import "./css/ProfilePost.css";

const Post = ({ post }) => {
	return (
		<div className="single-post-container">

			{/* <p>{post.post_user.username}</p> */}
			<Link to="#">
				<img src={post.url} className="profile-post"></img>
			</Link>

		</div>
	);
};

export default Post;
