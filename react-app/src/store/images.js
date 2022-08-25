const GET_IMAGES = "session/GET_IMAGES";
const GET_IMAGE = "session/GET_IMAGE";
const ADD_IMAGE = "session/ADD_IMAGE";
const DELETE_IMAGE = "session/DELETE_IMAGE";
const EDIT_IMAGE = "session/EDIT_IMAGE";
const TOGGLE_LIKE = "session/TOGGLE_LIKE";
const ADD_COMMENT = "action/ADD_COMMENT";
const DELETE_COMMENT = "session/DELETE_COMMENT";
const EDIT_COMMENT = "session/EDIT_COMMENT";
const getImages = (images) => ({
	type: GET_IMAGES,
	images,
});

// const getImage = (image) => ({
// 	type: GET_IMAGE,
// 	image,
// });
const toggleLike = (id) => ({
	type: TOGGLE_LIKE,
	id,
});

const addImage = (image) => ({
	type: ADD_IMAGE,
	image,
});

const deleteImage = (id) => ({
	type: DELETE_IMAGE,
	id,
});

const editImage = (image) => ({
	type: EDIT_IMAGE,
	image,
});

const CreateCommentAction = (comment) => ({
	type: ADD_COMMENT,
	comment
})

const deleteComment = (id) => ({
	type: DELETE_COMMENT,
	id,
});
const editComment = (comment) => ({
	type: EDIT_COMMENT,
	comment,
});

// get the homepage of the current user
// and get images by current user in profile page
export const loadHomePage = () => async (dispatch) => {
	const response = await fetch(`/api/images`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getImages(data));
		return data;
	} else {
		return ["An error occurred. Please try again."];
	}
};

// get images by user ID
// and get images by current user in profile page
export const loadImages = (id) => async (dispatch) => {
	const response = await fetch(`/api/images/users/${id}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getImages(data));
		return data;
	} else {
		return ["An error occurred. Please try again."];
	}
};
// create a image
export const CreateImage = (image) => async (dispatch) => {
	const response = await fetch("/api/images/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(image),
	});

	if (response.ok) {
		const image = await response.json();
		dispatch(addImage(image));
		return image;
	}
};

// update a image
export const UpdateImage = (image) => async (dispatch) => {
	const response = await fetch(`/api/images/${image.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(image),
	});
	if (response.ok) {
		const updatedImage = await response.json();
		dispatch(editImage(updatedImage));
		return updatedImage;
	}
};

export const toggleALike = (imageId) => async (dispatch) => {
	const response = await fetch(`/api/images/${imageId}/likes`, {
		method: "POST",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(editImage(data))
	}
};

export const DeleteImage = (id) => async (dispatch) => {
	const response = await fetch(`api/images/${id}`, {
		method: "Delete",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteImage(id));
		return data;
	}
};
// create comment
export const CreateComment = (comment) => async(dispatch) =>{
	const response = await fetch (`/api/images/${comment.image_id}/comment`, {
		method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
	})
	if (response.ok) {
		const new_comment = await response.json()
		dispatch(CreateCommentAction(new_comment))
	}
}

// edit comment
export const EditComment = (comment) => async (dispatch) => {
	const response = await fetch(`/api/comment/${comment.id}`, {
		method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
	})
	if (response.ok) {
		const new_comment = await response.json()
		dispatch(editComment(new_comment))
	}
}
//delete comment 
export const DeleteComment = (id) => async (dispatch) => {
	const response = await fetch(`api/comment/${id}`, {
		method: "Delete",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteComment(id));
		return data;
	}
}



const initialState = {};

export default function images(state = initialState, action) {
	let newState = {};
	switch (action.type) {
		case GET_IMAGES:
			// newState = { ...action.images };
			action.images.forEach(image => {
				newState[image.id] = image
				let likes = {};
				newState[image.id]["liked_user_ids"].forEach(
					(user) => (likes[user.id] = user)
				);
				newState[image.id]["liked_user_ids"] = likes;
			})
            return newState;
		case ADD_IMAGE:
			newState = { ...state };
			newState[action.image.id] = action.image;
			return newState;
		case EDIT_IMAGE:
			newState = { ...state };
			newState[action.image.id] = action.image
			let likes = {};
			newState[action.image.id]["liked_user_ids"].forEach(
			(user) => (likes[user.id] = user)
			);
			newState[action.image.id]["liked_user_ids"] = likes;
			newState[action.image.id] = action.image;
			return newState;
		case DELETE_IMAGE:
			newState = { ...state };
			delete newState[action.id];
			return newState;
		case ADD_COMMENT:
			newState = {...state}
			newState[action.comment.image_id].comments.push(action.comment)
			return newState
		case EDIT_COMMENT:
			newState = {...state}
			newState[action.comment.image_id].comments.forEach(element => {
				if (element.id === action.comment.id){
					element = action.comment
				}
			})
			return newState
		case DELETE_COMMENT:
			newState = {...state}
			// newState[action.comment.image_id].comments.forEach((element, index) => {
			// 	if (element.id === action.comment.id){
			// 		comments.splice(index,1)
			// 	}
			// })
			// list.splice( list.indexOf('Blues'), 1 )
			return newState
		default:
			return state;
	}
}
