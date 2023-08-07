export const createAuthSession = ({ token }) => {
	localStorage.setItem("token", token);
};

export const getAuthSession = () => {
	const token = localStorage.getItem("token");
	return { token };
};

export const checkAuthSession = () => {
	const token = localStorage.getItem("token");
	if (token !== null) {
		return true;
	}
	return false;
};

export const getAuthToken = () => localStorage.getItem("token");

export const deleteAuthSession = () => {
	localStorage.removeItem("token");
};

export const saveToStorage = (key, value) => {
	try {
		// check if value is an object
		if (typeof value === "object") {
			value = JSON.stringify(value);
		}

		localStorage.setItem(key, value);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getFromStorage = (key) => localStorage.getItem(key);

export const deleteFromStorage = (key) => localStorage.removeItem(key);

export const checkDateOfBirth = (date) => {
	// Split the date string into year, month, and day components
	const [year, month, day] = date.split("-").map(Number);

	// Create a Date object for the date of birth
	const dobDate = new Date(year, month - 1, day); // Note: Months are 0-indexed in JavaScript Date

	// Calculate the user's age in milliseconds
	const ageInMillis = Date.now() - dobDate.getTime();

	// Convert milliseconds to years (assuming an average year has 365.25 days)
	const ageInYears = ageInMillis / (365.25 * 24 * 60 * 60 * 1000);

	// console.log(ageInYears);
	// console.log(date)
	// return false;

	return ageInYears >= 18;
};

export const isImage = (file) => {
	const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];

	// check file extensions
	const extension = file.type;

	return acceptedImageTypes.includes(extension);
};

export const isAcceptableFileSize = (file, acceptedSize = 1000000) =>
	file.size <= acceptedSize;

export const clearFormFields = (form) => {
	const formFields = form.querySelectorAll("input, select");
	formFields.forEach((field) => {
		field.value = "";
	});
};

export const fillFormFields = (form, data) => {
	const formFields = form.querySelectorAll("input, select");

	// loop through object data
	for (const key in data) {
		// loop through form fields
		formFields.forEach((field) => {
			// console.log( field.id)

			if (field.type === "file") return;

			// check if key matches field name
			if (key === field.id) {
				field.value = data[key];
			}
		});
	}
};
// Path: src\utils\constants.js
