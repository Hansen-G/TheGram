import { Modal } from "../../context/Modal";
import { useEffect } from "react";
import Like from "./Like";
import "./index.css";

const LikeModal = ({ showLikeModal, setShowLikeModal, likes }) => {
	//Prevent scrolling on modal open
	useEffect(() => {
		if (showLikeModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showLikeModal]);
	return (
		<>
			{showLikeModal && (
				<Modal onClose={() => setShowLikeModal(false)}>
					<div className="like-modal-container">
						<h3 className="like-modal-title">Likes</h3>
						{Object.values(likes).map((userLike) => {
							return (
								<Like user={userLike} key={userLike.id}></Like>
							);
						})}
					</div>
				</Modal>
			)}
		</>
	);
};

export default LikeModal;
