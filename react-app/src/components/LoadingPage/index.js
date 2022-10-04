import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './LoadingPage.css'


const LoadingPage = () => {
	const dispatch = useDispatch();
    // const [loaded, setLoaded] = useState(false)
	const user = useSelector(state => state.session.user)


        return (
        <div className="loading-home-left flex">
		<div className="loading-card-post-container flex">
			<div className="post-user-info flex">
				<div className="loading-profile-image-div">
				</div>
				<div className="post-user-name-div flex">

					<div className="loading-post-user-name-div-username">
					</div>


					<div className="loading-post-location"></div>

				</div>
			</div>
			<div className="loading-post-image">

			</div>
			<div className="post-info">
				<div className="post-function-bar flex">

					<div className="loading-post-function-bar-left">
					</div>

				</div>
				<div className="loading-image-likes">
				</div>


				<div className="post-all-comments">
				</div>
				<div className="post-date"></div>
				<div className="div-line"></div>
				<div className="post-add-comment flex">
					<form className="flex load-card-post">
						<i
							className="fa-solid fa-angle-right"
							id="card-comment-icon"
						></i>
						<input
                            disabled
							className="loading-post-comment-input"
						></input>
						<button
							type="submit"
							disabled
							className={
								"disabled loading-post-commit-submit"
							}
							id="homepage-post"
						>

						</button>
					</form>
				</div>
			</div>
		</div>
        </div>
	);
	// );
};

export default LoadingPage;
