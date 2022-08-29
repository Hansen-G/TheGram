import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImageModal from "../ImageModal/";
import { CreateComment } from "../../store/images";
import { toggleALike } from "../../store/images";
import { cut, pastDate } from "../../util/";

function HomePageCard({ image, user }) {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const [errors, setErrors] = useState([]);

	// useEffect(() => {
	// 	const newError = [];
	// 	if (comment.length > 1000) {
	// 		newError.push("Comment must be less than 1000 characters");
	// 	}
	// }, [comment]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const error = []
		if (comment.trimEnd().length === 0) {
			error.push("please enter a valid comment")
			setErrors(error)
		} else if (comment.length > 1000){
			error.push("Comment must be less than 1000 characters")
			setErrors(error)
		}
		else {
			const newComment = {
				comment: comment,
				image_id: image.id,
				user_id: user.id,
			};
			dispatch(CreateComment(newComment));
			setComment("");
		}

	};

	const toggleImageLike = (imageId) => {
		dispatch(toggleALike(imageId));
	};
	return (
		<div className="card-post-container flex" key={image.id}>
			<div className="post-user-info flex">
				<div className="profile-image-div">
					<Link to={`/${image.post_user.id}`}>
						<img
							src={image.post_user.profile_img}
							className="profile-image"
							alt="profile"
						></img>
					</Link>
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
				<img
					src={image.url}
					className="post-image-detail"
					alt="post"
				></img>
			</div>
			<div className="post-info">
				<div className="post-function-bar flex">

					<div className="post-function-bar-left">
						{image.liked_user_ids[user.id] ? (
							<i
								className="fa-solid fa-heart curent_user_liked"
								onClick={() => toggleImageLike(image.id)}
							></i>
						) : (
							<i
								className="fa-regular fa-heart curent_user_unliked"
								onClick={() => toggleImageLike(image.id)}
							></i>
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
							<div className="post-description-user">
								{image.post_user.username}
							</div>
						</Link>

						<div className="post-description-detail">
							{" "}
							{image.description}
						</div>
					</div>
				)}
				{image["description"].length > 100 && (
					<div className="post-description">
						<Link to={`/${image.post_user.id}`}>
							<div className="post-description-user">
								{image.post_user.username}
							</div>
						</Link>
						<div className="post-description-detail">
							{" "}
							{cut(image.description)} ...
						</div>
					</div>
				)}
				<div className="post-all-comments">
					<ImageModal image={image} icon={"View"} user={user} />
				</div>
				<div className="post-date">{pastDate(image.createdAt)}</div>
				<div className="div-line"></div>
				<div className="post-add-comment flex">
					<form onSubmit={handleSubmit} className="flex card-post">
						<i
							className="fa-solid fa-angle-right"
							id="card-comment-icon"
						></i>
						<input
							type="text"
							placeholder="Add a comment..."
							value={comment}
							maxLength="1000"
							onChange={(e) => {
								setComment(e.target.value)
								setErrors([])
							}}
							className="post-comment-input"
						></input>
						<button
							type="submit"
							disabled={comment.length === 0 || errors.length > 0}
							className={
								comment.trimEnd().length === 0
									? "disabled post-commit-submit"
									: "enabled post-commit-submit"
							}
							id="homepage-post"
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
