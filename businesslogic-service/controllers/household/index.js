// importovat databaseService
const householdValidator = require("../../models/household");
const householdValidator = require("../../models/household");

class HouseholdController {
    async list (_req, _res) {
        try {
            const data = _req.query;
            const valid = householdValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.listModel.validate.errors)
            }
            const list = databaseService.household.list(data.limit, data.parentId) 
            return _res.send(list); 
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
        
    }
    async createHousehold (_req, _res) {
        try {
            const data = _req.body;
            const valid = householdValidator.createModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.createModel.validate.errors)
            }
            const household = databaseService.household.create(data.name, data.ownerID, data.membersIDs, data.balance) // patří tam i data.timestamp (createdAt)?
            return _res.send(household);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async updateHousehold (_req, _res) {
        try {
            const data = _req.body
            const valid = householdValidator.updateModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.updateModel.validate.errors)
            }
            const household = databaseService.household.update(data.id, data.name, data.ownerID, data.membersIDs, data.balance, data.timestamp) // patří tam i data.timestamp (updatedAt)?
            return _res.send(household);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async deleteHousehold (_req, _res) {
        try {
            const data = _req.query
            const valid = householdValidator.deleteModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.deleteModel.validate.errors)
            }
            const household = databaseService.household.delete(data.id)
            return _res.send(household);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
}

module.exports = new HouseholdController()