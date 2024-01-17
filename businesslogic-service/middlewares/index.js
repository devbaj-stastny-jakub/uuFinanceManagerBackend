const { ErrorMessage, ThrowableError, buildErrorMessage, responseErrorCodes } = require('../errors');
const handleError = (error, req, res, next) => {
	if(!error.cause) {
		error.cause = buildErrorMessage(responseErrorCodes.UNKNOWN_ERROR, undefined, undefined)
	}
	res.status(error.status || 400).json(error.cause);
};

module.exports = { handleError };
