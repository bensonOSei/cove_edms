import PropTypes from "prop-types";

export const LoadingPrompt = ({ message = "Loading..." }) => {
	return (
		<>
			<div className="flex flex-col items-center justify-center w-full max-w-sm">
				<div>
					<lord-icon
						src="https://cdn.lordicon.com/xjovhxra.json"
						trigger="loop"
						colors="primary:#1e3a8a,secondary:#08a88a"
						stroke="50"
						style={{
							width: "150px",
							height: "150px",
						}}></lord-icon>
				</div>
				<p className="text-lg text-center text-slate-300">{message}</p>
			</div>
		</>
	);
};

LoadingPrompt.propTypes = {
	message: PropTypes.string
};
