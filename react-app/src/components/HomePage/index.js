import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHomePage } from "../../store/images";
import HomePageCard from "../HomePageCard";
import "./HomePage.css";
import FollowUsers from "../FollowUsers";
import LoadingPage from "../LoadingPage";

function HomePage() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		dispatch(loadHomePage(user.id));
		window.scrollTo(0,0)
	}, [dispatch, user]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoaded(true);
		}, 2050);
		return () => clearTimeout(timeout);
	}, []);

	const images = useSelector((state) => state.images);
	// if (!images || Object.keys(images).length === 0) {
	// 	return <FollowUsers />;
	// }
	let imagesArr = Object.values(images).sort(function (a, b) {
		return new Date(b["createdAt"]) - new Date(a["createdAt"]);
	});

	return (
		<div className="home flex">
			{loaded && user ?
			<div className="home-left flex">
				{
					imagesArr.length > 0 &&
					imagesArr.map((image) => (
						<HomePageCard
							key={image.id}
							image={image}
							user={user}
						/>
				 	))
				}
				{<FollowUsers passuser={user} />}
			</div>
			: user ? <div>
						{(() => {
            				let arr = []
            				for (let i = 0; i <= 3; i++) {
                				arr.push(
								<LoadingPage />
                				)
            				}

            				return arr
            			})()}
					</div> : null}
			{<FollowUsers passuser={user} />}
		</div>
	);
}

export default HomePage;
