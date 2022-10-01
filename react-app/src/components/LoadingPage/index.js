import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './LoadingPage.css'
// import { loadImages } from "../../store/images";
// import Post from "./Post";

const LoadingPage = () => {
	const dispatch = useDispatch();
    // const [loaded, setLoaded] = useState(false)
	const user = useSelector(state => state.session.user)

	// useEffect(() => {
	// 	dispatch(loadImages(user.id));
	// }, [dispatch, user]);

    // useEffect(() => {

    //     const clear = setTimeout(() => {
    //         setLoaded(true)
    //       }, 1000)

    //     return () => clearTimeout(clear)

    // }, [loaded])
	// const images = Object.values(useSelector((state) => state.images));
	// return (
		// <div className="home flex">
        {/* {(() => {
            let arr = []
            for (let i = 0; i <= 3; i++) {
                arr.push(
                <div className="card-post-container flex">hello</div>
                )
            }

            return arr
            })()} */}
        return (
        <div className="loading-home-left flex">
		<div className="loading-card-post-container flex">
			<div className="post-user-info flex">
				<div className="profile-image-div">
					{/* <Link to={`/${image.post_user.id}`}>
						<img
							src={image.post_user.profile_img}
							className="profile-image"
							alt="profile"
						></img>
					</Link> */}
				</div>
				<div className="post-user-name-div flex">

					<div className="post-user-name-div-username">

					</div>


					<div className="post-location"></div>

				</div>
			</div>
			<div className="post-image">
				{/* <img
					src={image.url}
					className="post-image-detail"
					alt="post"
				></img> */}
			</div>
			<div className="post-info">
				<div className="post-function-bar flex">

					<div className="post-function-bar-left">
						{/* {image.liked_user_ids[user.id] ? (
							<i
								className="fa-solid fa-heart curent_user_liked"
								onClick={() => toggleImageLike(image.id)}
							></i>
						) : (
							<i
								className="fa-regular fa-heart curent_user_unliked"
								onClick={() => toggleImageLike(image.id)}
							></i>
						)} */}

						{/* <ImageModal
							image={image}
							icon={<i className="fa-regular fa-comment"></i>}
							user={user}
						/> */}
						{/* <i className="fa-regular fa-paper-plane"></i> */}
					</div>
					{/* <div className='post-function-bar-right'>
                                            <i className="fa-regular fa-bookmark"></i>
                                        </div>     */}
				</div>
				<div className="image-likes">
					{/* {image.user_image_likes} likes */}
				</div>
				{/* {image["description"].length <= 100 && (
					<div className="post-description">
						<Link to={`/${image.post_user.id}`}>
							<div className="post-description-user">
								{image.post_user.username}
							</div>
						</Link>

						<div className="post-description-detail">
							{" "}
							{image.description}
						</div>
					</div>
				)} */}
				{/* {image["description"].length > 100 && (
					<div className="post-description">
						<Link to={`/${image.post_user.id}`}>
							<div className="post-description-user">
								{image.post_user.username}
							</div>
						</Link>
						<div className="post-description-detail">
							{" "}
							{cut(image.description)} ...
						</div>
					</div>
				)} */}
				<div className="post-all-comments">
					{/* <ImageModal image={image} icon={"View"} user={user} /> */}
				</div>
				<div className="post-date"></div>
				<div className="div-line"></div>
				<div className="post-add-comment flex">
					{/* <form onSubmit={handleSubmit} className="flex card-post">
						<i
							className="fa-solid fa-angle-right"
							id="card-comment-icon"
						></i>
						<input
							type="text"
							placeholder="Add a comment..."
							value={comment}
							minLength="1"
							maxLength="1000"
							onChange={(e) => {
								setComment(e.target.value)
								setErrors([])
							}}
							className="post-comment-input"
						></input>
						<button
							type="submit"
							disabled={comment.length === 0 || errors.length > 0}
							className={
								comment.trimEnd().length === 0
									? "disabled post-commit-submit"
									: "enabled post-commit-submit"
							}
							id="homepage-post"
						>
							Post
						</button>
					</form> */}
				</div>
			</div>
		</div>
        </div>
	);
	// );
};

export default LoadingPage;
