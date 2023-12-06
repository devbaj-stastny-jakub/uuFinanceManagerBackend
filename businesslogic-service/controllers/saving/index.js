const savingValidator = require("../../models/saving");
const databaseService = require("../../services/databaseService")
const {ThrowableError, buildErrorMessage, responseErrorCodes} = require("../../errors");



class SavingController {
    objectName = "saving"

    async list (_req, _res, next) {
        try {
            const data = _req.query;
            savingValidator.listModel.validate(data)
            const list = await databaseService.saving.list(data.householdId, _req.auth.payload.sub)
            return _res.send(list);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async get(_req, _res, next) {
        try {
            const data = {
                id: _req.params.id,
            }
            savingValidator.identifierModel.validate(data.id)
            const saving = await databaseService.saving.get(data)
            if (!saving) throw ThrowableError(buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data.id), undefined, 400)
            if (saving.errorCode) throw ThrowableError(buildErrorMessage(saving.errorCode, this.objectName, data.id), undefined, 400)
            return _res.send(saving);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async create(_req, _res, next) {
        try {
            const data = _req.body;
            savingValidator.createModel.validate(data)

            let parent = await databaseService.household.get(data.householdId)
            if (parent.errorCode) throw ThrowableError(buildErrorMessage(parent.errorCode, "household", data.householdId), undefined, 400)
            if (!parent) throw ThrowableError(buildErrorMessage(responseErrorCodes.NOT_FOUND, "household", data.householdId), undefined, 400)

            const create = await databaseService.saving.create(data)
            return _res.send(create);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async update (_req, _res, next) {
        try {
            const data = _req.body
            savingValidator.updateModel.validate(data)
            const response = await databaseService.saving.update(data)
            if (response.errorCode) throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data.id), undefined, 400)
            return _res.send(response);
        } catch (e) {
            console.log(e)
            next(e)
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
