import PropTypes from 'prop-types';


export const ErrorPrompt = ({ message }) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full max-w-sm">
                <h1 className="text-3xl font-semibold text-red-500 mb-4">
                    Error
                </h1>
                <p className="text-lg text-center text-slate-300">
                    {message}
                </p>
            </div>
        </>
    )
}

ErrorPrompt.propTypes = {
    message: PropTypes.string.isRequired
}
