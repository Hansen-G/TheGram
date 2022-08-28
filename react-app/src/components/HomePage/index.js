import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHomePage } from "../../store/images";
import HomePageCard from "../HomePageCard";
import "./HomePage.css";
import FollowUsers from "../FollowUsers";

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
		}, 250);
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
			<div className="home-left flex">
				{loaded &&
					imagesArr.length > 0 &&
					imagesArr.map((image) => (
						<HomePageCard
							key={image.id}
							image={image}
							user={user}
						/>
					))}
			</div>
			{loaded && <FollowUsers passuser={user} />}
		</div>
	);
}

export default HomePage;
