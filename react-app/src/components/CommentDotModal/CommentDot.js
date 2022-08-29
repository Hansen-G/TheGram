import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EditComment, DeleteComment } from "../../store/images";

import "./CommentDot.css";

function CommentDot({ setModal, comment, user }) {
	const dispatch = useDispatch();
	const [commentToBeEdited, setCommentToBeEdited] = useState(comment.comment);
	const [errors, setErrors] = useState([]);


	useEffect(() => {
		const newError = [];
		if (commentToBeEdited.length > 1000) newError.push("Comment must be 1000 characters or less");
		if (!commentToBeEdited) newError.push("Please input your comment");
		setErrors(newError)
	}, [commentToBeEdited])

	const deleteListener = async (commentId, imageId) => {
		if (
			window.confirm(
				"Do you really want to delete this Comment? This action can not be undone!"
			)
		) {
			const response = dispatch(DeleteComment(commentId, imageId));
			if (response) {
				window.alert("Successfully deleted the Comment");
				setModal(false);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const error = []
		if (commentToBeEdited.trimEnd().length === 0) {
			error.push("please enter a valid comment")
			setErrors(error)

		} else if (commentToBeEdited.length > 1000){
			error.push("Comment must be less than 1000 characters")
			setErrors(error)
		}
		else {
			const editedComment = {
				comment: commentToBeEdited,
				commentId: comment.id,
				imageId: comment.image_id,
			};
			dispatch(EditComment(editedComment));
			setModal(false);
		}


	};

	return (
		<div className="dot-modal">
			<div className="edit-comment dot-bar flex" id="edit-comment">
				<form
					onSubmit={handleSubmit}
					action="PUT"
					className="dot-edit-form"
				>
					<div className="dot-edit-form-div flex">
						<div>Edit Comment</div>
						<textarea
							placeholder="No more than 1000 characters"
							type={"text"}
							minLength="1"
							maxLength="1000"
							row="10"
							id="dot-edit-comment"
							value={commentToBeEdited}
							onChange={(e) =>{
								setCommentToBeEdited(e.target.value)
								setErrors([])
							}
							}
						></textarea>



						<div className="edit-error">
							{ (errors) }
						</div>



						<button
							type="submit"
							disabled={commentToBeEdited.length === 0 || errors.length}
							className={
								commentToBeEdited.trimEnd().length === 0
									? "disabled post-commit-submit"
									: "enabled post-commit-submit"
							}
							id="edit-comment-post"
						>
							Post
						</button>
					</div>
				</form>
			</div>
			<div className="div-line" id="model-div-line"></div>

			<div className="card delete-image dot-bar flex">
				<button
					onClick={() => deleteListener(comment.id, comment.image_id)}
					className="cancel-edit-button"
				>
					Delete
				</button>
			</div>
			<div className="div-line" id="model-div-line"></div>
			<div className="card cancel-image dot-bar flex">
				<button
					onClick={() => {
						setModal(false);
					}}
					className="cancel-edit-button"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default CommentDot;
