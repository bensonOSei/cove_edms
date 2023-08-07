import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

export const PopUp = ({ children, show = false }) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 100 }}
                    className="fixed top-10 right-6 w-full max-w-sm z-50">
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

PopUp.propTypes = {
	children: PropTypes.node.isRequired,
	show: PropTypes.bool,
};
