const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { UserModel } = require("../models");
const { ErrorHandler, CustomErrorMessage } = require('../utils')
module.exports = async function(req, res, next) {
    let token = req.header('Authorization');
    if (!token) {
        throw new ErrorHandler(CustomErrorMessage.AUTH_TOKEN_MUST_BE_SENT, 401);
    }
    token = token.replace('Bearer ', '');
    const data = jwt.verify(token, JWT_SECRET);
    let userFound = await UserModel.findById(data._id);
    if (!userFound) {
        throw new ErrorHandler(CustomErrorMessage.USER_DOES_NOT_EXIST, 401);
    }
    const tokenExist = userFound.tokens.find(tkn => tkn.token === token);
    if (!tokenExist) {
        throw new ErrorHandler(CustomErrorMessage.AUTH_TOKEN_NOT_FOUND, 401);
    }
    req.user = JSON.parse(JSON.stringify(userFound));
    req.token = tokenExist;
    next();
}