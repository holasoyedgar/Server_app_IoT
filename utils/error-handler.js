module.exports = function CustomError(message, httpStatus) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.status = httpStatus;
};

require('util').inherits(module.exports, Error);