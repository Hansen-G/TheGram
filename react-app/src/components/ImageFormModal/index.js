import React from "react";
// import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "../../context/Modal";
import ImageForm from "./ImageForm";
import "./ImageForm.css";

function ImageFormModal({ showModal, setShowModal, image, onClose, setModal }) {
	//Prevent scroll on form open
	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showModal]);

	return (
		<div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<ImageForm
						setShowModal={setShowModal}
						showModal={showModal}
						image={image}
						onClose={onClose}
						setModal={setModal}
					/>
				</Modal>
			)}
		</div>
	);
}

export default ImageFormModal;
