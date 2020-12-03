const BaseService = require("./base.service");

const {
    HistoryRepository,
    DevicesRepository,
} = require("../repositories");
const {
    CONSTANTS,
    CustomErrorMessage
} = require("../utils");


let _historyRepository = null;
let _devicesRepository = null;

class IoTService extends BaseService {
    constructor() {
        super(DevicesRepository);
        _historyRepository = HistoryRepository;
        _devicesRepository = DevicesRepository;
    }

    async addDevice(body) {
        const device = await _devicesRepository.getArduinoPin(body.arduinoPin);
        if (device) {
            throw new ErrorHandler(CustomErrorMessage.ARDUINO_PIN_IS_ALREADY_USED, 409);
        }
        return await _devicesRepository.create(body);
    }

    async updateDevice(body, bulbId) {
        const device = await _devicesRepository.getArduinoPin(body.arduinoPin);
        if (device) {
            if (String(device._id) !== String(bulbId))
                throw new ErrorHandler(CustomErrorMessage.ARDUINO_PIN_IS_ALREADY_USED, 409);
        }
        return await _devicesRepository.update(bulbId, body);
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

    async getHistory(pageNumber) {
        return await _historyRepository.getAllPopulated({}, pageNumber || 1, 'device user', {
            createdAt: -1
        });
    }
}

module.exports = new IoTService();