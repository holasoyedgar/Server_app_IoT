const BaseService = require("./base.service");

const {
    HistoryRepository,
    DevicesRepository,
} = require("../repositories");
const { CONSTANTS } = require("../utils");


let _historyRepository = null;
let _devicesRepository = null;

class IoTService extends BaseService {
    constructor() {
        super(DevicesRepository);
        _historyRepository = HistoryRepository;
        _devicesRepository = DevicesRepository;
    }

    async addDevice(body) {
        return await _devicesRepository.create(body);
    }

    async turnon_bulb(bulbId, user) {
        const device = await _devicesRepository.update(bulbId, {
            status: CONSTANTS.DEVICE_STATUS[1]
        });

        await _historyRepository.create({
            device: bulbId,
            user: user._id,
            status: CONSTANTS.DEVICE_STATUS[1]
        });
        return device;
    }

    async turnoff_bulb(bulbId, user) {
        const device = await _devicesRepository.update(bulbId, {
            status: CONSTANTS.DEVICE_STATUS[0]
        });

        await _historyRepository.create({
            device: bulbId,
            user: user._id,
            status: CONSTANTS.DEVICE_STATUS[0]
        });
        return device;
    }

    async getState() {
        return await _devicesRepository.getList();
    }
}

module.exports = new IoTService();