const BaseRepository = require("./base.repository");
const { HistoryModel } = require("../models");

let _history = null;

class HistoryRepository extends BaseRepository {
    constructor() {
        super(HistoryModel);
        _history = HistoryModel;
    }
}

module.exports = new HistoryRepository();