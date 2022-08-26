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
export const isValidUrl = (urlString) => {
	const isItUrl = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlString);
	if (!isItUrl) return false;
	if (urlString.indexOf("File:") !== -1) return false;
	try {
		return Boolean(new URL(urlString));
	} catch (e) {
		return false;
	}
};
