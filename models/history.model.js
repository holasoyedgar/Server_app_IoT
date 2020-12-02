const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const {
    CONSTANTS
} = require('../utils');

const {
    Schema
} = mongoose;

let historySchema = new Schema({
    device: {
        type: Schema.ObjectId,
        ref: CONSTANTS.DEVICE_REFERENCE
    },
    user: {
        type: Schema.ObjectId,
        ref: CONSTANTS.USER_REFERENCE
    },
    status: {
        type: String,
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});


historySchema.plugin(mongoosePaginate);

module.exports = mongoose.model(CONSTANTS.HISTORY_REFERENCE, historySchema);