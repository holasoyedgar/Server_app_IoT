const {
    UsersService
} = require("../services");
const {
    success
} = require("../utils/resp");

let _usersService = UsersService;



class UsersController {

    constructor() {

    }

    async signUp(req, res) {
        const { body } = req;
        const user = await _usersService.signUp(body);
        return success(res, 201, user);
    }
    
    async signIn(req, res) {
        const { username, password } = req.body;
        const user = await _usersService.signIn(username, password);
        return success(res, 200, user);
    }
    
    async logOut(req, res) {
        const { user, token } = req;
        await _usersService.logOut(user, token);
        return success(res, 200, {});
    }

    
}

module.exports = new UsersController();