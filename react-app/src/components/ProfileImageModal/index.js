import { Modal } from "../../context/Modal";

function ProfileImageModal({ showModal, setShowModal, post }) {
	return (
		<>
			<Modal onClose={() => setShowModal(false)}>
                <div>{post.description}</div>
			</Modal>
		</>
	);
}

export default ProfileImageModal;


