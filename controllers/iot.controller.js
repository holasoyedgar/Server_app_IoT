const {
    IoTService
} = require("../services");
const {
    success
} = require("../utils/resp");

let _iotService = IoTService;



class IoTController {

    constructor() {

    }

    async hello_world(req, res) {
        return success(res, 200, {"name": "Edgar Eduardo Rincon Serrano"});
    }

    async addDevice(req, res) {
        const { body } = req;
        const device = await _iotService.addDevice(body); 
        return success(res, 201, device);
    }

    async turnon_bulb(req, res) {
        const { bulbId } = req.params;
        const { user } = req;
        const device = await _iotService.turnon_bulb(bulbId, user);
        return success(res, 200, device);
    }
    
    async turnoff_bulb(req, res) {
        const { bulbId } = req.params;
        const { user } = req;
        const device = await _iotService.turnoff_bulb(bulbId, user);
        return success(res, 200, device);
    }
    
    async getStatus(req, res) { 
        const status = await _iotService.getState();
        return success(res, 200, status);
    }
}

module.exports = new IoTController();