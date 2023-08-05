import PropTypes from 'prop-types'
import { motion } from "framer-motion"

const SubmitButton = ({isSubmitting = false, text, onClick}) => {
  return (
    <div className="mb-4 w-full">
    <button
        disabled={isSubmitting}
        onClick={onClick}
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
                        Loading...
                    </span>
                </motion.div>
            ) : (
                `${text}`
            )}
    </button>
</div>
)
}

SubmitButton.propTypes = {
    isSubmitting: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default SubmitButton
