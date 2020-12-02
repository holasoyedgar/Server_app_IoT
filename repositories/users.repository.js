const BaseRepository = require("./base.repository");
const { UserModel } = require("../models");

let _user = null;

class UsersRepository extends BaseRepository {
    constructor() {
        super(UserModel);
        _user = UserModel;
    }

    async getUserByEmailOrUsername(username) {
        const user = await _user.findOne({
            username: username
        });
        return user;
    }
}

module.exports = new UsersRepository();