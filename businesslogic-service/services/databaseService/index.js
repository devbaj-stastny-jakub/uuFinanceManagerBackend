const databaseServiceTransaction = require("./transaction")
const databaseServiceHousehold = require("./household")

const databaseServiceTag = require("./tag")
const databaseServiceSaving = require("./saving")

class DatabaseService {
    constructor(_databaseServiceTransaction, _databaseServiceTag, _databaseServiceSaving, _databaseServiceHousehold) {
        this.transaction = _databaseServiceTransaction
        this.tag = _databaseServiceTag
        this.saving = _databaseServiceSaving
        this.household = _databaseServiceHousehold
    }
}

module.exports = new DatabaseService(databaseServiceTransaction, databaseServiceTag, databaseServiceSaving, databaseServiceHousehold)
