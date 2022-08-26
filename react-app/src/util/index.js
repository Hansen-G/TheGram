export const cut = (str) => {
	return str.substring(0, 100) + "...";
};

export const pastDate = (date) => {
	const now = new Date();
	const past = new Date(date);
	const different = now - past;
	const differentDays = Math.floor(different / (1000 * 60 * 60 * 24));
	if (differentDays === 0) {
		const diferentHours = Math.floor(different / (1000 * 60 * 60));
		if (diferentHours === 0) {
			const diferentMinutes = Math.floor(different / (1000 * 60));
			if (diferentMinutes === 0) {
				const diffSeconds = Math.floor(different / 1000);
				return `${diffSeconds} seconds ago`;
			}
			return `${diferentMinutes} minutes ago`;
		}
		return `${diferentHours} hours ago`;
	} else if (differentDays === 1) {
		return "1 day ago";
	} else {
		return differentDays + " days ago";
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
