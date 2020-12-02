const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const {
    sign
} = require("jsonwebtoken");
const {
    compareSync,
    hashSync,
    genSaltSync
} = require("bcryptjs");
const {
    CONSTANTS
} = require('../utils');

const {
    Schema
} = mongoose;

const {
    JWT_SECRET,
} = require("../config");

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, CONSTANTS.USER_USERNAME_IS_REQUIRED]
    },
    password: {
        type: String,
        required: [true, CONSTANTS.USER_PASSWORD_IS_REQUIRED]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

userSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    return user;
}

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = sign({
        _id: user._id
    }, JWT_SECRET, {
        expiresIn: '30d'
    });
    user.tokens = user.tokens.concat({
        token
    });
    await user.save();
    return token;
}

userSchema.methods.passwordMatched = async function (password) {
    return compareSync(password, this.password);
}

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model(CONSTANTS.USER_REFERENCE, userSchema);