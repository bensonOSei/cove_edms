import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export const SideNavLink = ({ to, icon, text, hideText = false }) => {
	const inactiveClasses =
		"hover:bg-blue-300/40 px-5 py-2 flex items-center gap-2 w-full mb-3 rounded-md font-medium text-blue-800 transition";
	const activeClasses =
		"bg-blue-300 px-5 py-2 flex items-center gap-2 w-full mb-3 rounded-md font-medium text-blue-800 transition";


	return (
		<>
			<NavLink
				className={({ isActive }) =>
					isActive ? activeClasses : inactiveClasses
				}
				to={to}>
				<FontAwesomeIcon
					icon={icon}
					className="text-blue-900"
				/>
				{!hideText && <span className="w-28 font-semibold">{text}</span>}
			</NavLink>
		</>
	);
};


SideNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    hideText: PropTypes.bool
}
