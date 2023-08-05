import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextProviders/contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Modal } from "../components/modals/Modal";
import { ErrorPrompt } from "../components/modals/prompts/ErrorPrompt";
import { AnimatePresence, motion } from "framer-motion";
export const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [username, setUsername] = useState("");
	const [inputs, setInputs] = useState({});
	const [error, setError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { login, isLoggedIn, authError } = useContext(AuthContext);
	const [modalOpen, setModalOpen] = useState(false);
	const navigator = useNavigate();
	
	useEffect(() => {
		if (isLoggedIn === true) {
			// redirect to home page
			navigator("/");
			return;
		}
		const rememberMe = localStorage.getItem("rememberMe") === "true";
		const username = rememberMe ? localStorage.getItem("username") : "";
		setUsername(username);
		setRememberMe(rememberMe);

		if (authError !== null) {
			setIsSubmitting(false);
			setError(true);
		}
	}, [isLoggedIn, authError, navigator]);

	if(isLoggedIn) return <Navigate to="/" />

	const handleInputChange = (e) => {
		// e.persist();
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(false);

		// check if remember me is checked
		// if checked, save username and password to local storage
		// else, save username only
		if (inputs.remember) {
			localStorage.setItem("username", inputs.username);
			localStorage.setItem("rememberMe", inputs.remember);
		}

		// check if username and password are set
		if (inputs.username && inputs.password) {
			setIsSubmitting(true);
			login(inputs);
			return;
		}

		// if username and password are not set, set error to true
		setModalOpen(true);
	};


		

	return (
		<div className="p-2 pt-10 h-screen">
			<AnimatePresence>
				{modalOpen && (
					<Modal
						element={
							<ErrorPrompt message="Please fill all fields" />
						}
						closeModal={() => {
							setModalOpen(false);
						}}
					/>
				)}
			</AnimatePresence>

			<div className="w-full max-w-sm mx-auto rounded-md p-6 ring-4 shadow-2xl shadow-slate-200">
				<h1 className="text-3xl font-black text-center mb-2">
					Cove Inc.
				</h1>
				<h2 className="text-center">EDMS login</h2>

				<form
					onSubmit={handleSubmit}
					className="mt-10">
					{error && (
						<div
							className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3"
							role="alert">
							<strong className="font-bold">Error!</strong>
							<span className="block sm:inline">
								{authError}
							</span>
						</div>
					)}
					<div className="mb-4">
						<label
							className="block mb-2 font-semibold"
							htmlFor="username">
							Username
						</label>
						<input
							className="w-full border border-slate-100 rounded-md p-2"
							type="text"
							id="username"
							name="username"
							placeholder="Enter your username"
							onChange={handleInputChange}
							defaultValue={username}
						/>
					</div>

					<div className="mb-4">
						<label
							className="block mb-2 font-semibold"
							htmlFor="password">
							Password
						</label>
						<div className="flex items-center gap-1">
							<input
								className="w-full border border-slate-100 rounded-md p-2"
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Enter your password"
								onChange={handleInputChange}
							/>
							<button
								className="px-5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 mt-1"
								onClick={(e) => {
									e.preventDefault();
									setShowPassword(!showPassword);
								}}>
								{showPassword ? (
									<FontAwesomeIcon icon={faEyeSlash} />
								) : (
									<FontAwesomeIcon icon={faEye} />
								)}
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="remember"
								name="remember"
								defaultChecked={rememberMe}
								className="rounded-full"
								onChange={handleInputChange}
							/>
							<label
								className="ml-2"
								htmlFor="remember">
								Remember me
							</label>
						</div>
						{/* <div className="text-sm" >
                        <a href="#" >Forgot password?</a>
                    </div> */}
					</div>
					<div className="mb-4">
						<button
							disabled={isSubmitting}
							className={`flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md ${isSubmitting && "opacity-50"}`}
							type="submit">
								{isSubmitting ? (
									<motion.div
										className="flex items-center"
										initial={{ x: -20 }}
										animate={{ x: 0 }}>
										<lord-icon
											src="https://cdn.lordicon.com/xjovhxra.json"
											trigger="loop"
											colors="primary:#ffffff,secondary:#08a88a"
											stroke="60"
											style={{
												width: "30px",
												height: "30px",
											}}></lord-icon>
										<span className="ml-2">
											Logging in...
										</span>
									</motion.div>
								) : (
									"Login"
								)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
