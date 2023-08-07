import { PopUp } from "./PopUp"
import PropTypes from "prop-types"

export const Alert = ({ show = false, closeAlert, message }) => {


  return (
    <PopUp show={show} >
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Alert</h2>
            <p className="text-sm text-gray-500 mb-4">{message}</p>
            <div className="flex justify-end gap-2">
                <button className="bg-blue-900 w-full text-white px-4 py-2 rounded-lg"  onClick={closeAlert} >Ok</button>
            </div>
        </div>
    </PopUp>
  )
}

Alert.propTypes = {
    closeAlert: PropTypes.func,
    show: PropTypes.bool,
    message: PropTypes.string.isRequired,
}
