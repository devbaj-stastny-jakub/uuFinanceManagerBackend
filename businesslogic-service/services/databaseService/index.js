const databaseServiceTransaction = require("./transaction")
class DatabaseService {
    constructor(_databaseServiceTransaction) {
        this.transaction = _databaseServiceTransaction
    }
}

module.exports = new DatabaseService(databaseServiceTransaction)
