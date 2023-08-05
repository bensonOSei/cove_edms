import PropTypes from "prop-types"

export const Select = ({ onChange, id, label, type ="text", required = false, options }) => {
	return (
		<div className="mb-4 w-full">
			<label
				className="block mb-2 font-semibold"
				htmlFor={id}>
				{label}
                {" "}
                {required && "*"}
			</label>
			<select
				className="w-full border border-slate-100 rounded-md p-2"
				type={type}
				id={id}
				name={id}
				onChange={onChange}
                required={required}
			>
                <option disabled defaultValue={''} >Select {label}</option>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
		</div>
	);
};

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.array.isRequired,
}
