import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadImages } from "../../store/images";
import Post from "./Post";

const Feed = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadImages());
	}, [dispatch]);

	const images = Object.values(useSelector((state) => state.images));
	return (
		<div>
			{images.length > 0 &&
				images.map((image) => {
					return <Post post={image} key={image.id}></Post>;
				})}
		</div>
	);
};

export default Feed;
