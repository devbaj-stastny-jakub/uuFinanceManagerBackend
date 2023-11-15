const savingValidator = require("../../models/saving");

class SavingController {
    async list (_req, _res) {
        try {
            const data = _req.query;
            const valid = savingValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(savingValidator.listModel.validate.errors)
            }
            const list = databaseService.saving.list(data.householdID, data.savingName)
            return _res.send(list);
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
            const saving = databaseService.saving.create(data.savingName, data.goal, data.description, data.householdID,)
            return _res.send(saving);
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
            const update = await databaseService.saving.update(data.savingName, data.goal, data.description, data.householdID,data.currentBalance,)
            return update;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async delete(_req, _res) {
        try {
            const data = _req.query
            const valid = savingValidator.deleteModel.validate(data)
            if(!valid) {
                return _res.status(400).json(savingValidator.deleteModel.validate.errors)
            }
            const deleted = await databaseService.saving.delete(data)
            return deleted;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }

}

module.exports = new SavingController()