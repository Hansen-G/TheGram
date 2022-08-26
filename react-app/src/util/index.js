export const cut = (str) => {
	return str.substring(0, 100) + "...";
};

export const pastDate = (date) => {
	const now = new Date();
	const then = new Date(date);
	const diff = now - then;
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (diffDays === 0) {
		const diffHours = Math.floor(diff / (1000 * 60 * 60));
		if (diffHours === 0) {
			const diffMinutes = Math.floor(diff / (1000 * 60));
			if (diffMinutes === 0) {
				const diffSeconds = Math.floor(diff / 1000);
				return `${diffSeconds} seconds ago`;
			}
			return `${diffMinutes} minutes ago`;
		}
		return `${diffHours} hours ago`;
	} else if (diffDays === 1) {
		return "1 day ago";
	} else {
		return diffDays + " days ago";
	}
};

// Validate if url is an image function
export const isValidUrl = async (urlString, setErrors, error) => {
	const isItUrl = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlString);
	if (!isItUrl) return false;
	if (urlString.indexOf("File:") !== -1) return false;

	try {
		let fetchImage = await fetch(urlString);
	} catch (e) {
		setErrors(error => error.push(['Cannot get url']))
		return false;
	}


	let imageTest = new Image();

	imageTest.src = urlString;
	imageTest.onerror = function () {
		return false;
	};
	imageTest.onload = function () {
		if (this.width > 0) {
		} else {
			return false;
		}
	};

	let checkImageRequest = new XMLHttpRequest();
	try {
		checkImageRequest.open("GET", urlString, true);
		checkImageRequest.send();
		checkImageRequest.onerror = function () {
			return false;
		};
		checkImageRequest.onload = function () {
			console.log(checkImageRequest.status);
			if (checkImageRequest.status !== 200) {
				return false;
			}
		};
	} catch (e) {
		return false;
	}
	// try {
	// 	let check = Boolean(URL(urlString));

	// } catch (e) {
	// 	return false;
	// }
	return true;
};
