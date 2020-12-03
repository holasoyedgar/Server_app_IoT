const BaseRepository = require("./base.repository");
const { DevicesModel } = require("../models");

let _device = null;

class DevicesRepository extends BaseRepository {
    constructor() {
        super(DevicesModel);
        _device = DevicesModel;
    }

    async getArduinoPin(pin) {
        const device = await _device.findOne({
            arduinoPin: pin
        });
        return device;
    }
}

module.exports = new DevicesRepository();