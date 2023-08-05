export const createAuthSession = ({token}) => {
	localStorage.setItem("token", token);
};

export const getAuthSession = () => {
    const token = localStorage.getItem("token");
    return {token}
}

export const checkAuthSession = () => {
    const token = localStorage.getItem("token");
    if(token !== null){
        return true
    }
    return false
}

export const getAuthToken = () => localStorage.getItem("token");

export const deleteAuthSession = () => {
    localStorage.removeItem("token");
};



// Path: src\utils\constants.js
