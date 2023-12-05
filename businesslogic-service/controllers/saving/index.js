const savingValidator = require("../../models/saving");
const databaseService = require("../../services/databaseService")
const {ThrowableError, buildErrorMessage, responseErrorCodes} = require("../../errors");



class SavingController {
    objectName = "saving"

    async list (_req, _res) {
        try {
            const data = _req.query;
            const valid = savingValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(savingValidator.listModel.validate.errors)
            }
            const list = await databaseService.saving.list(data.householdId)
            return _res.send(list);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async get(_req, _res) {
        try {
            const data = _req.params.id
            const valid = savingValidator.findIdModel.validate(data)
            if (!valid) {
                return _res.status(400).json(savingValidator.findIdModel.validate.errors)
            }
            const saving = await databaseService.saving.get(data)
            if (!saving) throw ThrowableError(buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data), undefined, 400)
            if (saving.errorCode) throw ThrowableError(buildErrorMessage(saving.errorCode, this.objectName, data), undefined, 400)
            return _res.send(saving);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async create(_req, _res) {
        try {
            const data = _req.body;
            const valid = savingValidator.createModel.validate(data)
            if(!valid) {
                return _res.status(400).json(savingValidator.createModel.validate.errors)
            }
            const create = await databaseService.saving.create(data)
            return _res.send(create);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async update (_req, _res) {
        try {
            const data = _req.body
            const valid = savingValidator.updateModel.validate(data)
            if(!valid) {
                return _res.status(400).json(savingValidator.updateModel.validate.errors)
            }
            const response = await databaseService.saving.update(data)
            if (response.errorCode) throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data), undefined, 400)
            return _res.send(response);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async delete(_req, _res) {
        try {
            const data = _req.params.id
            const valid = savingValidator.deleteModel.validate(data)
            if(!valid) {
                return _res.status(400).json(savingValidator.deleteModel.validate.errors)
            }
            const deleted = await databaseService.saving.delete(data)
            if (deleted.errorCode) throw ThrowableError(buildErrorMessage(deleted.errorCode, this.objectName, data), undefined, 400)
            return _res.send(deleted);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }

}

module.exports = new SavingController()
