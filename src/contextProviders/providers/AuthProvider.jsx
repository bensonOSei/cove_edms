import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { BACKEND_URL_API } from "../../utils/constants";
import axios from "axios";
import {
	checkAuthSession,
	createAuthSession,
	getAuthSession,
} from "../../utils/helpers";

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => checkAuthSession());
	const { setUser } = useContext(UserContext);
	const [authError, setAuthError] = useState(null);
	const [token, setToken] = useState(null);

	const login = (inputs) => {
		setAuthError(null)
		// send username and password to backend
		// if success, set isLoggedIn to true
		// else, set isLoggedIn to false
		axios
			.post(`${BACKEND_URL_API}/login`, inputs)
			.then((res) => {
				createAuthSession(res.data);
				// console.log(res.data);
				setUser(res.data.user);
				setIsLoggedIn(true);
			})
			.catch((err) => {
				// console.log(err);
				setIsLoggedIn(false);
				setUser({});
				setAuthError(err.response.data.message);
			});
	};

	const logout = () => {
		// send logout request to backend
		// if success, set isLoggedIn to false
		// else, set isLoggedIn to true
		axios
			.post(`${BACKEND_URL_API}/logout`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				// console.log(res.data);
				// if success, set user to empty object
				// clear local storage
				setUser({});
				setIsLoggedIn(false);
				localStorage.clear();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		
		setAuthError(null);
		// check if user is logged in
		// if logged in, set isLoggedIn to true
		// else, set isLoggedIn to false
		const checkLoggedInStatus = async () => {
			if (await checkAuthSession()) {
				const { token } = await getAuthSession();
				setToken(token);
				setIsLoggedIn(true);
			} 

			// setIsLoggedIn(false);
		};

		checkLoggedInStatus();
	}, [setUser, isLoggedIn]);
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				login,
				logout,
				authError,
				token,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
