import { faSignOutAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextProviders/contexts/AuthContext";
import PropTypes from "prop-types";
import { Modal } from "../modals/Modal";
import { ErrorPrompt } from "../modals/prompts/ErrorPrompt";
import { DashHeaderLoader } from "./DashHeaderLoader";

export const DashHeader = ({ user, isFetching }) => {
	const { logout, authError } = useContext(AuthContext);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [error, setError] = useState(false);

	const handleLogout = () => {
		setIsLoggingOut(true);
		logout();
	};

	useEffect(() => {
		if (authError !== null) {
			isLoggingOut(false);
			setError(true);
		}
	}, [isLoggingOut, authError]);

	if(isFetching) return <DashHeaderLoader />

	return (
		<div className="bg-blue-800/5 w-full py-3 rounded-lg flex items-center justify-between border border-slate-100 px-6">
			<div className="flex gap-3">
				<h1 className="text-2xl font-semibold text-blue-900">
					Dashboard
				</h1>
			</div>

			<div className="flex gap-3 items-center">
				<h1>{user.username}</h1>
				<div className="w-1 h-1 bg-blue-900 rounded-full"></div>
				<button
					onClick={handleLogout}
					disabled={isLoggingOut}
					className="hover:bg-blue-600/20 p-2 rounded-md">
					{isLoggingOut ? (
						<FontAwesomeIcon
							icon={faSpinner}
							className="animate-spin"
						/>
					) : (
						<FontAwesomeIcon
							icon={faSignOutAlt}
							className="text-blue-900"
						/>
					)}
				</button>
			</div>

			{error && <Modal element={<ErrorPrompt message={authError} />} />}
		</div>
	);
};

DashHeader.propTypes = {
	user: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
};
