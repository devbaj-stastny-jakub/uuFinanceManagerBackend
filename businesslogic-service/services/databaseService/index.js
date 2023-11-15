const databaseServiceTransaction = require("./transaction")
const databaseServiceTag = require("./tag")
const databaseServiceSaving = require("./saving")

class DatabaseService {
    constructor(_databaseServiceTransaction, _databaseServiceTag, _databaseServiceSaving) {
        this.transaction = _databaseServiceTransaction
        this.tag = _databaseServiceTag
        this.saving = _databaseServiceSaving
    }
}

module.exports = new DatabaseService(databaseServiceTransaction, databaseServiceTag, databaseServiceSaving)
