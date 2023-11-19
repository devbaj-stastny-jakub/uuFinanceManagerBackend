const databaseService = require("../../services/databaseService")
const transactionValidator = require("../../models/transaction")
const {responseErrorCodes, ErrorMessage, buildErrorMessage, ThrowableError} = require("../../errors")

class TransactionController {
    objectName = "transaction"

    async list(_req, _res, next) {
        try {
            const data = _req.query;
            transactionValidator.listModel.validate(data)
            const response = await databaseService.transaction.list(data.limit, data.parentId)
            if (response.errorCode) throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName), undefined, 400)
            return _res.send(response);
        } catch (e) {
            next(e)
        }
    }

    async create(_req, _res, next) {
        try {
            const data = _req.body
            transactionValidator.createModel.validate(data)
            //todo: parenta hledat v domácnostech a spočících cílech
            const parentExists = await databaseService.transaction.get(data.parentId)
            if (!parentExists) throw ThrowableError(buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data.parentId), undefined, 400)
            if (parentExists.errorCode) throw ThrowableError(buildErrorMessage(parentExists.errorCode, this.objectName, data.parentId), undefined, 400)
            //todo: Doplnit id autentifikovaného uživatele
            const transaction = await databaseService.transaction.create(data, "0YETAEBJMWBCIPL6HU8LHAW2")
            if (transaction.errorCode) throw new Error(undefined, {cause: buildErrorMessage(transaction.errorCode, this.objectName)})
            return _res.send(transaction)
        } catch (e) {
            next(e)
        }
    }

    async get(_req, _res, next) {
        try {
            const data = _req.params.id
            transactionValidator.identifierModel.validate(data)
            const transaction = await databaseService.transaction.get(data)
            if (!transaction) throw ThrowableError(buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data), undefined, 400)
            if (transaction.errorCode) throw ThrowableError(buildErrorMessage(transaction.errorCode, this.objectName, data), undefined, 400)
            return _res.send(transaction)
        } catch (e) {
            next(e)
        }
    }

    async delete(_req, _res, next) {
        try {
            const data = _req.params.id
            transactionValidator.identifierModel.validate(data)
            const response = await databaseService.transaction.delete(data)
            if (response.errorCode) throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data), undefined, 400)
            return _res.send()
        } catch (e) {
            next(e)
        }
    }

    async update(_req, _res, next) {
        try {
            const data = _req.body
            transactionValidator.updateModel.validate(data)
            const response = await databaseService.transaction.update(data.id, {...data, id: undefined})
            if (response.errorCode) throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data.id), undefined, 400)
            return _res.send(response)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TransactionController()
