import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import ImageDetails from "../ImageModal/ImageDetails";

function ProfileImageModal({ showModal, setShowModal, post, image }) {

	const user = useSelector(state => state.session.user)
	return (
		<>
			<Modal onClose={() => setShowModal(false)}>
				{/* <div>Work</div> */}
                 <ImageDetails user={user} image={image} />
			</Modal>
		</>
	);
}

export default ProfileImageModal;
