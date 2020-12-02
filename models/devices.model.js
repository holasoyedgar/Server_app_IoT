const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const {
    CONSTANTS
} = require('../utils');

const {
    Schema
} = mongoose;

let deviceSchema = new Schema({
    arduinoPin: {
        type: Number,
        required:  [true, CONSTANTS.ARDUINO_PIN_IS_REQUIRED]
    },
    deviceDescription: {
        type: String,
        required:  [true, CONSTANTS.DEVICE_DESCRIPTION_IS_REQUIRED]
    },
    status: {
        type: String,
        enum: CONSTANTS.DEVICE_STATUS,
        default: CONSTANTS.DEVICE_STATUS[0]
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});


deviceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model(CONSTANTS.DEVICE_REFERENCE, deviceSchema);