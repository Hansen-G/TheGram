import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "../../context/Modal";

import ImageDetails from "./ImageDetails";

function ImageModal({ image, icon, user }) {
	const [showModal, setShowModal] = useState(false);

	// function that returns setShwoMOdalfalse and pass as prop
	const setModal = (show) => setShowModal(show);
	if (icon === "View") {
		icon = `View all ${image.comments.length} ${
			image.comments.length === 1 ? "comment" : "comments"
		}`;
	}
	//Prevent scrolling on modal open
	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showModal]);

	return (
		<>
			<button
				className="comments-button"
				onClick={() => setShowModal(true)}
			>
				{icon}
			</button>
			{showModal && (
				<Modal
					id="post-model"
					onClose={() => setShowModal(false)}
					className="post-model"
				>
					<ImageDetails
						setModal={setModal}
						image={image}
						user={user}
						className="post-model"
					/>
				</Modal>
			)}
		</>
	);
}

export default ImageModal;
