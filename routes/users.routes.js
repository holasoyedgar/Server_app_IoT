const express = require('express');

const api = express.Router();

const {
    UsersController
} = require("../controllers");

const { AuthMiddleware } = require('../middlewares');

api.post('/users/sign-up',  UsersController.signUp);
api.put('/users/sign-in',  UsersController.signIn);
api.put('/users/log-out', AuthMiddleware,  UsersController.logOut);


module.exports = api;