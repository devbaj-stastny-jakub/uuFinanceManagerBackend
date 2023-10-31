const databaseService = require("../../services/databaseService")
const transactionValidator = require("../../models/transaction")

class TransactionController {
    list(_req, _res){
        try {
            const data = _req.body;
            const valid = transactionValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(transactionValidator.listModel.validate.errors)
            }
            const list = databaseService.transaction.list()
            return list;
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
}

module.exports = new TransactionController()
