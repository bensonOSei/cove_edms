import PropTypes from "prop-types";

export const Input = ({
	onChange,
	id,
	label,
	type = "text",
	placeholder,
	required = false,
	value = "",
}) => {
	return (
		<div className="mb-4 w-full">
			<label
				className="block mb-2 font-semibold"
				htmlFor={id}>
				{label} {required && "*"}
			</label>
			<input
				className="w-full border border-slate-100 rounded-md p-2"
				type={type}
				id={id}
				name={id}
				placeholder={placeholder}
				onChange={onChange}
				required={required}
				defaultValue={value}
			/>
		</div>
	);
};

Input.propTypes = {
	onChange: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.string,
};
