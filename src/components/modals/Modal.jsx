import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
export const Modal = ({ element, closeModal }) => {
	return (
		<div className="fixed top-0 left-0 bg-black/40 z-50  w-full h-full grid place-items-center">
			<motion.div
				initial={{ opacity: 0, rotate: -3 }}
				animate={{ opacity: 1, rotate: 0 }}
				exit={{ opacity: 0, rotate: 3 }}
				className="bg-white rounded-md p-6 ring-4 shadow-2xl relative backdrop-blur-md w-full max-w-md">
				<motion.button
					onClick={closeModal}
					className="absolute top-2 right-3 text-lg"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}>
					<FontAwesomeIcon icon={faTimes} />
				</motion.button>
				{element}
			</motion.div>
		</div>
	);
};

Modal.propTypes = {
	element: PropTypes.element.isRequired,
	closeModal: PropTypes.func.isRequired,
};
