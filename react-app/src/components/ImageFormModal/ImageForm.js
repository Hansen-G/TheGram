import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ImageForm.css";
import { CreateImage, UpdateImage } from "../../store/images";
import { isValidUrl } from "../../util";
const ImageForm = ({
	onClose,
	setShowModal,
	// showModal,
	image,
	setModal,
}) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	const [description, setDescription] = useState("");
	const [alt_description, setAltDescription] = useState("");
	const [show_stats, setShowStats] = useState(true);
	const [location, setLocation] = useState("");

	const [errors, setErrors] = useState([]);
	const [showAccessity, setShowAccessity] = useState(false);
	const [url, setUrl] = useState(""); //URL we will actually render as an <img/>
	const [validURL, setValidURL] = useState(false); // Boolean that will show if the URL below is actually a valid image url
	const setURLAndCheckURL = async (urlInput) => {
		const res = await isValidUrl(urlInput, setErrors, errors);
		setValidURL(res);
		setUrl(urlInput);
	};

	useEffect(() => {
		if (image) {
			setURLAndCheckURL(image.url);
			setDescription(image.description);
			setLocation(image.location)
			setShowStats(image.show_stats);
		}
	}, [image]);

	useEffect(() => {
		setErrors([]);
	}, [validURL]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const submitErrors = [];

		if (!validURL) {
			submitErrors.push(
				"Invalid URL: Please enter a valid URL ending in - jpg/jpeg/png/webp/avif/gif/svg. Also please make sure this image CORS policy compliant. Image can be blocked by CORS policy due to: No 'Access-Control-Allow-Origin' header being present on the requested resource."
			);
		}
		if (url.includes("File:")) {
			submitErrors.push(
				'Invalid URL: URL must not include "File:", Please use original image address'
			);
		}
		if (url.includes(' ')) {
			submitErrors.push(
				'Image cannot have an empty space in the url!'
			)
		}
		if (url.length > 1000) {
			submitErrors.push(
				"Invalid URL: URL must not be longer than 1000 characters"
			);
		}
		if (submitErrors.length > 0) {
			return setErrors(submitErrors);
		} else {
			setErrors(submitErrors);
		}
		if (!image) {
			const create_payload = {
				url,
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
		} else if (image) {
			const update_payload = {
				id: image.id,
				description,
				location,
				alt_description,
				show_stats,
				url,
			};
			dispatch(UpdateImage(update_payload))
				.then(() => onClose())
				.catch(async (data) => {
					if (data && data.errors) setErrors(data.errors);
				});
			setShowModal(false);
			setModal(false);
		}
	};

	return (
		<div className="image_form_container-main">
			<form onSubmit={handleSubmit}>
				<div className="button_container">
					<i
						className="fa-solid fa-arrow-left-long"
						onClick={() => {
							setShowModal(false);
						}}
					></i>
					<div className="form_title">
						{image ? "Edit info" : "Create new post"}
					</div>
					<button
						className={`create_submit_button ${
							errors.length > 0 ? "disabled" : ""
						}`}
						type="submit"
						disabled={errors.length > 0}
					>
						{image ? "Done" : "Share"}
					</button>
				</div>
				<div className="image_form_container">
					<div className="wrapper">
						<div className="preview_image_place_holder">
							{validURL && (
								<img
									className="image_to_update"
									src={url}
									alt="imageto be updated"
									type="url"
								></img>
							)}
						</div>
						<div className="right_div_container">
							<div className="add-image-info">
								<div className="user_profile_container">
									<img
										className="user_profile_pic"
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
								<div className="url">
									<input
										value={url}
										onChange={(e) => {
											setURLAndCheckURL(e.target.value)
											}
										}
										placeholder="Image URL"
										type="url"
										maxLength="1000"
										required
										className="post-text-input"
									/>
								</div>
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
								<div className="alt_description">
									<div className="accessibility_container">
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
											<div className="accessibility_words">
												Alt text describes your photos
												for people with visual
												impairments. Alt text will be
												automatically created for your
												photos or you can choose to
												write your own.
											</div>
											<div className="alt-text-container">
												{validURL && (
													<>
														<img
															className="image_to_update-mini"
															src={url}
															alt="imageto be updated"
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
