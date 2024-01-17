const { ErrorMessage } = require('../errors');
const handleError = (error, req, res, next) => {
	res.status(error.status || 400).json(error.cause);
};

module.exports = { handleError };
