const BaseService = require("./base.service");

const {
    CustomErrorMessage,
    ErrorHandler, 
    CONSTANTS
} = require("../utils");

const {
    UsersRepository
} = require("../repositories");


let _usersRepository = null;

class IoTService extends BaseService {
    constructor() {
        super(UsersRepository);
        _usersRepository = UsersRepository;
    }

    async signUp(body) {
        return await _usersRepository.create(body);
    }

    async signIn(username, password) {
        const userExist = await _usersRepository.getUserByEmailOrUsername(username);
        if (!userExist) {
            throw new ErrorHandler(CustomErrorMessage.AUTH_USER_OR_PASSWORD_INVALID, 401);
        }
        const verifiedPasswd = await userExist.passwordMatched(password);
        if (!verifiedPasswd) {
            throw new ErrorHandler(CustomErrorMessage.AUTH_USER_OR_PASSWORD_INVALID, 401);
        }
        const token = await userExist.generateAuthToken();
        return {
            user: userExist,
            token
        };
    }

    async logOut(user, currentToken) {
        let {
            tokens
        } = user;
        if (tokens.length < 1) {
            throw new ErrorHandler(CustomErrorMessage.AUTH_CANNOT_LOGOUT, 409);
        }

        const tokenToDelete = tokens.find(token =>
            String(token.token) === String(currentToken.token)
        );
        
        if (!tokenToDelete) {
            throw new ErrorHandler(CustomErrorMessage.AUTH_TOKEN_NOT_FOUND, 404);
        }
        
        return await _usersRepository.update(user._id, {
            "$pull": {
                "tokens": {
                    "_id": tokenToDelete._id
                }
            }
        });
    }

}

module.exports = new IoTService();