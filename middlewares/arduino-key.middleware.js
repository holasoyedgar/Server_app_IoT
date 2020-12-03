const { ARDUINO_KEY } = require("../config");
const { ErrorHandler, CustomErrorMessage } = require('../utils');
module.exports = async function(req, res, next) {
    let token = req.header('Authorization');
    if (!token) {
        throw new ErrorHandler(CustomErrorMessage.AUTH_TOKEN_MUST_BE_SENT, 401);
    }
    token = token.replace('Basic ', '');
    if(token !== ARDUINO_KEY)
        throw new ErrorHandler(CustomErrorMessage.ARDUINO_KEY_IS_WRONG, 401);
    next();
}