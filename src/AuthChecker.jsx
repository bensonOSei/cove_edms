import { useEffect, useState } from "react";
import { AuthProvider } from "./contextProviders/providers/AuthProvider";
import { UserProvider } from "./contextProviders/providers/UserProvider";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { checkAuthSession } from "./utils/helpers";

const AuthChecker = () => {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (checkAuthSession()) setIsLoggedIn(true);

		setLoading(false);
	}, [isLoggedIn]);

	if (loading) {
		// You can render a loading spinner or any other loading UI here
		return <div>Loading...</div>;
	}

	return (
		<UserProvider>
			<AuthProvider isLoggedIn={isLoggedIn}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</UserProvider>
	);
};

export default AuthChecker;
