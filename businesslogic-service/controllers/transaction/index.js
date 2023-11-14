const databaseService = require("../../services/databaseService")
const transactionValidator = require("../../models/transaction")

class TransactionController {
    async list(_req, _res) {
        try {
            const data = _req.query;
            const valid = transactionValidator.listModel.validate(data)
            if (!valid) {
                return _res.status(400).json(transactionValidator.listModel.validate.errors)
            }
            const list = await databaseService.transaction.list(data.limit, data.parentId)
            return _res.send(list);
        } catch (e) {
            _res.status(500).send(e)
        }
    }

    async create(_req, _res) {
        try {
            const data = _req.body
            const valid = transactionValidator.createModel.validate(data)
            if (!valid) {
                return _res.status(400).json(transactionValidator.createModel.validate.errors)
            }
            //todo: parenta hledat v domácnostech a spočících cílech
            const parentExists = await databaseService.transaction.get(data.parentId)
            if (!parentExists) {
                return _res.status(400).send({errorMessages: [{message: `Parent with id [${data}] does not exist`}]})
            }
            if (parentExists.errorMessages) {
                return _res.status(400).send(parentExists)
            }
            //todo: Doplnit id autentifikovaného uživatele
            const transaction = await databaseService.transaction.create(data, "0YETAEBJMWBCIPL6HU8LHAW2")
            return _res.send(transaction)
        } catch (e) {
            _res.status(500).send(e)
        }
    }

    async get(_req, _res) {
        try {
            const data = _req.params.id
            const valid = transactionValidator.identifierModel.validate(data)
            if (!valid) {
                return _res.status(400).json(transactionValidator.identifierModel.validate.errors)
            }
            const transaction = await databaseService.transaction.get(data)
            if (!transaction) {
                return _res.status(400).send({errorMessages: [{message: `Transaction with id [${data.parentId}] does not exist`}]})
            }
            if (transaction.errorMessages) {
                return _res.status(400).send(transaction)
            }
            return _res.send(transaction)
        } catch (e) {
            _res.status(500).send(e)
        }
    }

    async delete(_req, _res) {
        try {
            const data = _req.params.id
            const valid = transactionValidator.identifierModel.validate(data)
            if (!valid) {
                return _res.status(400).json(transactionValidator.identifierModel.validate.errors)
            }
            const response = await databaseService.transaction.delete(data)
            if (response.errorMessages) {
                return _res.status(400).send(response)
            }
            return _res.send()
        } catch (e) {
            _res.status(500).send(e)
        }
    }

    async update(_req, _res) {
        try{
            const data = _req.body
            const valid = transactionValidator.updateModel.validate(data)
            if (!valid) {
                return _res.status(400).json(transactionValidator.updateModel.validate.errors)
            }
            const response = await databaseService.transaction.update(data.id, {...data, id: undefined})
            if (response.errorMessages) {
                return _res.status(400).send(response)
            }
            return _res.send(response)
        } catch(e) {
            _res.status(500).send(e)
        }
    }
}

module.exports = new TransactionController()
