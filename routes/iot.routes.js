const express = require('express');

const api = express.Router();

const {
    IoTController
} = require("../controllers");
const { AuthMiddleware, ArduinoMiddleware } = require('../middlewares');

api.get('/iot/hello-world',  IoTController.hello_world);
api.post('/iot/device', AuthMiddleware, IoTController.addDevice);
api.put('/iot/device/:bulbId', AuthMiddleware, IoTController.updateDevice);
api.put('/iot/turn-on/:bulbId', AuthMiddleware, IoTController.turnon_bulb);
api.put('/iot/turn-off/:bulbId', AuthMiddleware, IoTController.turnoff_bulb);
api.get('/iot/get-status', ArduinoMiddleware, IoTController.getStatus);
api.get('/iot/get-history', AuthMiddleware, IoTController.getHistory);

module.exports = api;