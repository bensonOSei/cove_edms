import { useCallback, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import PropTypes from "prop-types";
import { BACKEND_URL } from "../../utils/constants";
import axios from "axios";
import { deleteAuthSession } from "../../utils/helpers";

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});
    const [userFetchError, setUserFetchError] = useState(false)
    const [fetching, setFetching] = useState(false)

	const updateUser = useCallback((newUserData) => {
		setUser((prevUserData) => ({ ...prevUserData, ...newUserData }));
	}, []);

	const fetchUserDetails = useCallback(async (token) => {
		// fetch user details from backend
		// if success, set user
		// else, set user to empty object
        if(token === null) return
        console.log("Fetching user")

        

        try {
            setFetching(true)
            const { data } = await axios.get(`${BACKEND_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            console.log(data.data)
            setUser(data.data);
            
            setUserFetchError(false)
            setFetching(false)

        } catch (error) {
            if(error.response.status === 401) deleteAuthSession()
            console.log(error)
            setUserFetchError(true)
            setFetching(false)
        }

        // console.log(data.data)
	}, []);

	return (
		<UserContext.Provider value={{ user, updateUser, setUser, fetchUserDetails, userFetchError, fetching }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
