const databaseService = require("../../services/databaseService")
const transactionValidator = require("../../models/transaction")

class TransactionController {
    async list(_req, _res){
        try {
            const data = _req.query;
            const valid = transactionValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(transactionValidator.listModel.validate.errors)
            }
            const list = await databaseService.transaction.list(data.limit, data.parentId)
            return list;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
}

module.exports = new TransactionController()
