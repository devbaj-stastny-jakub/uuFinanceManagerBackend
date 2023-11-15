const databaseServiceTransaction = require("./transaction")
const databaseServiceHousehold = require("./household")
class DatabaseService {
    constructor(_databaseServiceTransaction, _databaseServiceHousehold) {
        this.transaction = _databaseServiceTransaction
        this.household = _databaseServiceHousehold
    }
}

module.exports = new DatabaseService(databaseServiceTransaction, databaseServiceHousehold)
