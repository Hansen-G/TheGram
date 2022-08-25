// import {loadHomePage} from "./images";
// const ADD_COMMENT = "action/ADD_COMMENT";
// const DELETE_COMMENT = "session/DELETE_COMMENT";
// const EDIT_COMMENT = "session/EDIT_COMMENT";
// const GET_COMMENT = 'action/GET_COMMENT'

// // const addComment = (comment, imageId) => {
// // 	return {
// // 		type: ADD_COMMENT,
// // 		comment,
// // 		imageId,
// // 	}
// // };
// // const deleteComment = (id) => ({
// // 	type: DELETE_COMMENT,
// // 	id,
// // });
// // const editComment = (comment) => ({
// // 	type: EDIT_COMMENT,
// // 	comment,
// // });
// // create a comment
// // export const CreateComment = (comment, imageId) => async (dispatch) => {
// // 	const response = await fetch(`/api/images/${imageId}/comment`, {
// // 		method: "POST",
// // 		headers: {
// // 			'Content-Type': 'application/json'
// // 		},
// // 		body: JSON.stringify(comment)
// // 	})
// // 	if (response.ok) {
// // 		const new_comment = await response.json()
// // 		await dispatch(addComment(new_comment, imageId))
// // 		await dispatch(loadHomePage())
// // 		return new_comment
// // 	} else {
// // 		console.log('error')
// // 	}
// // }
// // const GetCommentsAction = (comments) => ({
// // 	type: GET_COMMENT,
// // 	comments
// // })

// // const CreateCommentAction = (comment) => ({
// // 	type: ADD_COMMENT,
// // 	comment
// // })

// // export const GetComment = (image_id) => async(dispatch) => {
// // 	const response = await fetch (`/api/images/${image_id}/comment`)
// // }


// // export const CreateComment = (comment) => async(dispatch) =>{
// // 	const response = await fetch (`/api/images/${comment.image_id}/comment`, {
// // 		method: "POST",
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(comment)
// // 	})
// // 	if (response.ok) {
// // 		const comment = await response.json()
// // 		dispatch(CreateCommentAction)
// // 	}

// // }

// // // update a image
// // export const UpdateImage = (image) => async(dispatch) => {
// // 	const response = await fetch(`/api/images/${image.id}`, {
// // 		method: "PUT",
// // 		headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(image)
// // 	})
// // 	if (response.ok) {
// //         const updatedImage = await response.json()
// //         dispatch(editImage(updatedImage))
// // 		return updatedImage
// //     }

// // }

// // export const DeleteImage = (id) => async (dispatch) => {
// // 	const response = await fetch(`api/images/${id}`, {
// // 		method: "Delete"
// // 	})
// // 	if (response.ok) {
// // 		const data = await response.json();
// // 		dispatch(deleteImage(id))
// // 		return data
// // 	}
// // }

// // const initialState = {};

// // export default function images(state = initialState, action) {
// // 	let newState = {};
// // 	switch (action.type) {
// // 		case GET_COMMENT:
// // 			action.comments.forEach(comment => {
// // 				newState[comment.id] = comment
// // 			});
// // 			return newState

// // 		case ADD_COMMENT:
// // 			newState = { ...state };
// // 			console.log('HIIIIIIIIIIIIIIIII', newState)
// // 			newState[action.comment.imageId].comments.push(action.comment);
			
// // 			return newState;
		
		
// 		// case EDIT_IMAGE:
// 		// 	newState = {...state}
// 		// 	newState[action.image.id]= action.image
// 		// 	return newState
// 		// case DELETE_IMAGE:
// 		// 	newState = {...state}
// 		// 	delete newState[action.id]
// 		// 	return newState
//         default:
//             return state
// 	}
// }
