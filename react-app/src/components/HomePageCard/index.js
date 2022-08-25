import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageModal from "../ImageModal/";
import { CreateComment } from "../../store/comments";
import { toggleALike } from "../../store/images";

function cut(str) {
	return str.substring(0, 100) + "...";
}

function pastDate(date) {
	const now = new Date();
	const then = new Date(date);
	const diff = now - then;
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (diffDays === 0) {
		const diffHours = Math.floor(diff / (1000 * 60 * 60));
		if (diffHours === 0) {
			const diffMinutes = Math.floor(diff / (1000 * 60));
			if (diffMinutes === 0) {
				const diffSeconds = Math.floor(diff / 1000);
				return `${diffSeconds} seconds ago`;
			}
			return `${diffMinutes} minutes ago`;
		}
		return `${diffHours} hours ago`;
	} else if (diffDays === 1) {
		return "1 day ago";
	} else {
		return diffDays + " days ago";
	}
}

function HomePageCard({ image, user }) {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");

	useEffect(() => {
		const newError = [];
		if (comment.length > 1000) {
			newError.push("Comment must be less than 1000 characters");
		}
	}, [comment]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newComment = {
			comment: comment,
			image_id: image.id,
			user_id: user.id,
		};
		dispatch(CreateComment(newComment, image.id));
		setComment("");
	};

	const toggleImageLike = (imageId) => {
        dispatch(toggleALike(imageId));

	};
	return (
		<div className="card-post-container flex" key={image.id}>
			<div className="post-user-info flex">
				<div className="profile-image-div">
					<img
						src={image.post_user.profile_img}
						className="profile-image"
					></img>
				</div>
				<div className="post-user-name-div flex">
					<Link to={`/${image.post_user.id}`}>
						<div className="post-user-name-div-username">
							{image.post_user.username}
						</div>
					</Link>
					{image["location"] && (
						<div className="post-location">{image.location}</div>
					)}
				</div>
			</div>
			<div className="post-image">
				<img src={image.url} className="post-image-detail"></img>
			</div>
			<div className="post-info">
				<div className="post-function-bar flex">
					<div className="post-function-bar-left">
						{image.liked_user_ids[user.id] ? (
							<i class="fa-solid fa-heart curent_user_liked" onClick={() => toggleImageLike(image.id)}></i>
						) : (
							<i className="fa-regular fa-heart curent_user_unliked" onClick={() => toggleImageLike(image.id)}></i>
						)}

						<ImageModal
							image={image}
							icon={<i className="fa-regular fa-comment"></i>}
							user={user}
						/>
						{/* <i className="fa-regular fa-paper-plane"></i> */}
					</div>
					{/* <div className='post-function-bar-right'>
                                            <i className="fa-regular fa-bookmark"></i>
                                        </div>     */}
				</div>
				<div className="image-likes">
					{image.user_image_likes} likes
				</div>
				{image["description"].length <= 100 && (
					<div className="post-description">
						<Link to={`/${image.post_user.id}`}>
							<a className="post-description-user">
								{image.post_user.username}
							</a>
						</Link>

						<a className="post-description-detail">
							{" "}
							{image.description}
						</a>
					</div>
				)}
				{image["description"].length > 100 && (
					<div className="post-description">
						<Link to={`/${image.post_user.id}`}>
							<a className="post-description-user">
								{image.post_user.username}
							</a>
						</Link>
						<a className="post-description-detail">
							{" "}
							{cut(image.description)}
						</a>
					</div>
				)}
				<div className="post-all-comments">
					<ImageModal image={image} icon={"View"} user={user} />
				</div>
				<div className="post-date">{pastDate(image.createdAt)}</div>
				<div className="div-line"></div>
				<div className="post-add-comment flex">
					<i className="fa-regular fa-face-smile"></i>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Add a comment..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							className="post-comment-input"
						></input>
						<button
							type="submit"
							disabled={comment.length === 0}
							className={
								comment.length === 0
									? "disabled post-commit-submit"
									: "enabled post-commit-submit"
							}
							id="editgroup"
						>
							Post
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default HomePageCard;
