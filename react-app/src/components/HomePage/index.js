import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHomePage } from "../../store/images";
import HomePageCard from "../HomePageCard";

import "./HomePage.css";

function HomePage() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(loadHomePage(user.id));
	}, [dispatch, user]);

	const images = useSelector((state) => state.images);
	if (!images || Object.keys(images).length === 0) {
		return null;
	}
	let imagesArr = Object.values(images).sort(function (a, b) {
		return new Date(b["createdAt"]) - new Date(a["createdAt"]);
	});

	return (
		<div className="home">
			<div className="home-left flex">
				{imagesArr.length > 0 &&
					imagesArr.map((image) => (
						<HomePageCard
							key={image.id}
							image={image}
							user={user}
						/>
					))}
			</div>
		</div>
	);
}

export default HomePage;
