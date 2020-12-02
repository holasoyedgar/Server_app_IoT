const BaseRepository = require("./base.repository");
const { DevicesModel } = require("../models");

let _device = null;

class DevicesRepository extends BaseRepository {
    constructor() {
        super(DevicesModel);
        _device = DevicesModel;
    }
}

module.exports = new DevicesRepository();