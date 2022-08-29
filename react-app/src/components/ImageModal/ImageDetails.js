import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleALike, toggleACommentLike } from "../../store/images";
import { CreateComment } from "../../store/images";
import CommentDotModal from "../CommentDotModal";
import ImageDotModal from "../ImageDotModal";
import { pastDate } from "../../util";
import "./ImageModal.css";

function checkLike(arr, int) {
	if (!arr || !arr.length) {
		return false;
	} else {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].id === int) {
				return true;
			}
		}
		return false;
	}
}

function ImageDetails({ image, user }) {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const [errors, setErrors] = useState([]);
	useEffect(() => {
		const newError = [];
		if (comment.length > 1000) {
			newError.push("Comment must be less than 1000 characters");
		}
	}, [image]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const error = []
		if (comment.trimEnd().length === 0) {
			error.push("please enter a valid comment")
			setErrors(error)
			console.log("@@@@@@@@@", errors)
		} else if (comment.length > 1000){
			error.push("Comment must be less than 1000 characters")
			setErrors(error)
		} else {

			e.preventDefault();
			const newComment = {
				comment: comment,
				image_id: image.id,
				user_id: user.id,
			};
			dispatch(CreateComment(newComment));
			setComment("");
		}
	};

	const toggleImageLike = async (imageId) => {
		await dispatch(toggleALike(imageId));
	};

	const toggleCommentLike = async (commentId, imageId) => {
		await dispatch(toggleACommentLike(commentId, imageId));
	};

	const commentArr = image["comments"].sort(function (a, b) {
		return new Date(b["createdAt"]) - new Date(a["createdAt"]);
	});

	return (
		<div className="card-model-container flex" key={image.id}>
			<div className="model-image">
				<img src={image.url} id="model-image-detail" alt="post"></img>
			</div>
			<div className="model-info flex">
				<div className="model-user-info flex">
					<div className="model-profile-image-div">
						<Link to={`/${image.post_user.id}`}>
							<img
								src={image.post_user.profile_img}
								className="profile-image"
								alt="profile"
							></img>
						</Link>
					</div>
					<div className="model-user-name-div flex">
						<div className="model-user-name-div-username model-description-user">
							{image.post_user.username}
						</div>

						{image["location"] && (
							<div
								className="post-location"
								id="modal-post-location"
							>
								{image.location}
							</div>
						)}
					</div>
					{image.post_user.id === user.id && (
						<ImageDotModal image={image} user={user} />
					)}
				</div>

				<div className="div-line" id="model-div-line"></div>

				<div className="modal-all-comments flex">
					<div
						className="model-user-info-description flex"
						id="model-user-info-description"
					>
						<div className="model-profile-image-div">
							<Link to={`/${image.post_user.id}`}>
								<img
									src={image.post_user.profile_img}
									className="profile-image"
									alt="profile"
								></img>
							</Link>
						</div>
						<div className="model-user-name-div flex">
							<div className="model-comments">
								<Link to={`/${image.post_user.id}`}>
									<div className="model-description-user">
										{image.post_user.username}
									</div>
								</Link>
								<div className="model-description-detail">
									{" "}
									{image.description}
								</div>
							</div>
						</div>
					</div>
					{commentArr &&
						commentArr.map((comment) => (
							<div
								className="model-user-info-description flex"
								id="model-user-info-description"
								key={comment.id}
							>
								<div className="model-profile-image-div">
									<Link to={`/${comment.user.id}`}>
										<img
											src={comment.user.profile_img}
											className="profile-image"
											alt="profile"
										></img>
									</Link>
								</div>
								<div
									className="model-user-name-div flex"
									id="comment-each"
								>
									<div className="model-comments">
										<Link to={`/${comment.user.id}`}>
											<div className="model-description-user">
												{comment.user.username}
											</div>
										</Link>
										<div className="model-description-detail">
											{" "}
											{comment.comment}
										</div>
									</div>
									<div>
										<div className="modal-comment-time">
											{pastDate(comment.createdAt)}
										</div>
										{comment.user.id === user.id && (
											<CommentDotModal
												comment={comment}
												user={user}
											/>
										)}
									</div>
								</div>
								<div className="post-function-bar-left">
									<div></div>
									{checkLike(
										comment.user_comment_likes,
										user.id
									) ? (
										<i
											className="fa-solid fa-heart curent_user_liked"
											id="comment-like-icon"
											onClick={() =>
												toggleCommentLike(
													comment.id,
													image.id
												)
											}
										></i>
									) : (
										<i
											className="fa-regular fa-heart curent_user_unliked"
											id="comment-like-icon"
											onClick={() =>
												toggleCommentLike(
													comment.id,
													image.id
												)
											}
										></i>
									)}

									{/* <i className="fa-regular fa-comment"></i> */}
									{/* <i className="fa-regular fa-paper-plane"></i> */}
								</div>
							</div>
						))}
				</div>

				<div className="div-line" id="model-div-line"></div>

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

						{/* <i className="fa-regular fa-comment"></i> */}
						{/* <i className="fa-regular fa-paper-plane"></i> */}
					</div>
					{/* <div className='post-function-bar-right'>
                                        <i className="fa-regular fa-bookmark"></i>
                                    </div>     */}
				</div>
				<div className="image-likes">
					{image.user_image_likes} likes
				</div>

				<div className="modal-date">{pastDate(image.createdAt)}</div>

				<div className="post-add-comment flex" id="post-add-comment">
					{/* <i className="fa-regular fa-face-smile"></i> */}
					<i
						className="fa-solid fa-angle-right"
						id="card-comment-icon"
					></i>
					<form
						onSubmit={handleSubmit}
						className="modal-comment-form"
					>
						<input
							type="text"
							placeholder="Add a comment..."
							value={comment}
							onChange={(e) => {
								setComment(e.target.value)
								setErrors([])
							}}
							className="modal-comment-input"
							maxLength="1000"
						></input>
						<button
							type="submit"
							disabled={comment.length === 0 || errors.length > 0}
							className={
								comment.trimEnd().length === 0
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

export default ImageDetails;
