import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ImageForm.css";
import { CreateImage, UpdateImage } from "../../store/images";

const ImageForm = ({ onClose, setShowModal, image }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	const [description, setDescription] = useState("");
	const [alt_description, setAltDescription] = useState("");
	const [show_stats, setShowStats] = useState(true);
	const [location, setLocation] = useState("");

	const [errors, setErrors] = useState([]);
	const [showAccessity, setShowAccessity] = useState(false);
	const [userImage, setUserImage] = useState(null);
	const [image_url, setImageURL] = useState(null);

	useEffect(() => {
		if (image) {
			setDescription(image.description);
			setLocation(image.location);
			setShowStats(image.show_stats);
			setImageURL(image.url);
			setAltDescription(image.alt_description);
		}
	}, [image]);

	const updateImage = (e) => {
		const file = e.target.files[0];
		let testImage = new Image();

		testImage.onload = function () {
			if (file.size > 5000000) {
				setUserImage(null);
			}
			setUserImage(file);
		};
		// If image does not load show an error
		testImage.onerror = function () {
			setUserImage(null);
		};
		//Create image to run previous tests
		testImage.src = URL.createObjectURL(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const submitErrors = [];

		if (submitErrors.length > 0) {
			return setErrors(submitErrors);
		} else {
			setErrors(submitErrors);
		}
		if (!image) {
			const create_payload = {
				userImage,
				description,
				location,
				alt_description,
				show_stats,
			};
			dispatch(CreateImage(create_payload))
				.then(() => onClose())
				.catch(async (data) => {
					if (data && data.errors) setErrors(data.errors);
				});
			setShowModal(false);
		} else if (image) {
			const update_payload = {
				id: image.id,
				description,
				location,
				alt_description,
				show_stats,
				image_url,
			};
			dispatch(UpdateImage(update_payload))
				.then(() => onClose())
				.catch(async (data) => {
					if (data && data.errors) setErrors(data.errors);
				});
			setShowModal(false);
		}
	};

	return (
		<div className="image-form-container-main">
			<form onSubmit={handleSubmit}>
				<div className="button-container">
					<i
						className="fa-solid fa-arrow-left-long"
						onClick={() => {
							setShowModal(false);
						}}
					></i>
					<div className="form-title">
						{image ? "Edit info" : "Create new post"}
					</div>
					<button
						className={`create-submit-button ${
							errors.length > 0 ? "disabled" : ""
						}`}
						type="submit"
						disabled={errors.length > 0}
					>
						{image ? "Done" : "Share"}
					</button>
				</div>
				<div className="image-form-container">
					<div className="wrapper">
						<div className="preview-image-place-holder">
							{image && (
								<img
									className="image-to-update"
									src={image.url}
									alt={alt_description}
								></img>
							)}

							{userImage && (
								<img
									className="image-to-update"
									src={URL.createObjectURL(userImage)}
									alt="imageto be updated"
									type="url"
								></img>
							)}
						</div>
						<div className="right-div-container">
							<div className="add-image-info">
								<div className="user-profile-container">
									<img
										className="user-profile-pic"
										src={user.profile_img}
										alt="profile"
									></img>
									<div>{user.name}</div>
								</div>
								<div className="description">
									<textarea
										className="description-text-area"
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
										placeholder="Optional (Write a caption)"
										maxLength="2200"
									/>
									{description && description.length > 0 ? (
										<div className="word-count">
											{description.length} / 2,200
										</div>
									) : (
										<div className="word-count">
											{" "}
											0 / 2200
										</div>
									)}
								</div>
								{image ? null : (
									<div className="url">
										<label
											htmlFor="file-input"
											className="image-input-button"
										>
											Click to upload image
										</label>
										<input
											id="file-input"
											className="upload-image-container"
											type="file"
											accept="image/png, image/jpg, image/jpeg, image/gif"
											onChange={updateImage}
										></input>
									</div>
								)}
								<div className="location">
									<input
										value={location}
										onChange={(e) =>
											setLocation(e.target.value)
										}
										placeholder="Optional (Add Location)"
										type="text"
										maxLength="250"
										className="post-text-input"
									/>
								</div>
								<div className="alt-description">
									<div className="accessibility-container">
										<div> Accessibility </div>
										{showAccessity && (
											<i
												className="fa-solid fa-angle-up"
												onClick={() =>
													setShowAccessity(false)
												}
											></i>
										)}
										{!showAccessity && (
											<i
												className="fa-solid fa-chevron-down"
												onClick={() =>
													setShowAccessity(true)
												}
											></i>
										)}
									</div>
									{showAccessity && (
										<div>
											<div className="accessibility-words">
												Alt text describes your photos
												for people with visual
												impairments. Alt text will be
												automatically created for your
												photos or you can choose to
												write your own.
											</div>
											<div className="alt-text-container">
												{(image_url || userImage) && (
													<>
														<img
															className="image-to-update-mini"
															src={
																image_url ||
																URL.createObjectURL(
																	userImage
																)
															}
															alt={
																alt_description
															}
															type="url"
														></img>

														<input
															value={
																alt_description
															}
															onChange={(e) =>
																setAltDescription(
																	e.target
																		.value
																)
															}
															placeholder="Write alt text..."
															type="text"
															maxLength="2200"
															className="post-text-input-alt-text"
														/>
													</>
												)}
											</div>
										</div>
									)}
									{errors.length > 0 && (
										<ul>
											{errors.map((error, index) => (
												<li
													key={index}
													className="image-post-error"
												>
													{error}{" "}
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ImageForm;
