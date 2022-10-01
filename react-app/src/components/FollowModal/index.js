import { Modal } from "../../context/Modal";
import { useEffect } from "react";
import Followers from "./Followers";
import Following from "./Following";
import "./index.css";

const FollowModal = ({ user, showFollowModal, setShowFollowModal, type }) => {
	//Prevent scrolling on modal open
	useEffect(() => {
		if (showFollowModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [showFollowModal]);
	return (
		<>
			{showFollowModal && (
				<Modal onClose={() => setShowFollowModal(false)}>
					<div className="follow-modal-container">
						<h3 className="follow-modal-title">{type}</h3>
						<div className="follow-list-modal">
							{type === "Followers" &&
								user.followers.map((follow) => {
									return (
										<Followers
											key={follow.follower_id}
											user={follow}
										></Followers>
									);
								})}
							{type === "Following" &&
								user.following.map((follow) => {
									return (
										<Following
											key={follow.following_id}
											user={follow}
										></Following>
									);
								})}
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default FollowModal;
