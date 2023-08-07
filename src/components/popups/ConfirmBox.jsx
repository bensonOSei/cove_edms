import { PopUp } from "./PopUp"
import PropTypes from "prop-types"
export const ConfirmBox = ({ show, onAccept, onCancel, message}) => {
  return (
    <PopUp show={show} >
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Confirm</h2>
            <p className="text-sm text-gray-500 mb-4">{message}</p>
            <div className="flex justify-end gap-2">
                <button onClick={onAccept}  className="bg-red-500 text-white px-4 py-2 rounded-lg">Ok</button>
                <button onClick={onCancel} className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg">Cancel</button>
            </div>
        </div>
    </PopUp>
  )
}

ConfirmBox.propTypes = {
    show: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
}
