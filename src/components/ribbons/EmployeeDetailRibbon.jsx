import PropTypes from "prop-types"

export const EmployeeDetailRibbon = ({ title, desc }) => {
	return (
		<div className="flex flex-col">
			<p className="font-bold text-lg">{title}</p>
			<p className="w-fit p-1 rounded-md">{desc}</p>
		</div>
	);
};

EmployeeDetailRibbon.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string
}
