import { Link } from "react-router-dom";
import "./css/ProfilePost.css";

const Post = ({ post }) => {
	return (
		<div className="single-post-container">
			<div className="">
				<Link to="#">
					<img src={post.url} className="profile-post"></img>
				</Link>
			</div>
		</div>
	);
};

export default Post;
