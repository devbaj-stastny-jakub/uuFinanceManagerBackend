const databaseServiceTransaction = require("./transaction")
const databaseServiceTag = require("./tag")
class DatabaseService {
    constructor(_databaseServiceTransaction, _databaseServiceTag) {
        this.transaction = _databaseServiceTransaction
        this.tag = _databaseServiceTag
    }
}

module.exports = new DatabaseService(databaseServiceTransaction, databaseServiceTag)
