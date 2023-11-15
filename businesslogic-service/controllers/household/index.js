const householdValidator = require("../../models/household");
const databaseService = require("../../services/databaseService");

class HouseholdController {
    async list (_req, _res) {
        try {
            const data = _req.query;
            const valid = householdValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.listModel.validate.errors)
            }
            const list = databaseService.household.list(data.limit, data.id) 
            return _res.send(list); 
        } catch (exception) {
            _res.status(500).send(exception)
        }
        
    }

    async get (_req, _res) {
        try {
            const data = _req.params.id;
            const valid = householdValidator.identifierModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.identifierModel.validate.errors)
            }
            const household = await databaseService.household.get(data)
            if (!household) {
                return _res.status(400).send({errorMessages: [{message: `Household with id [${data.id}] does not exist`}]})
            }
            if (household.errorMessages) {
                return _res.status(400).send(household)
            }
            return _res.send(household);
        }
        catch (e) {
            _res.status(500).send(e)
        }

    }  

    async create (_req, _res) {
        try {
            const data = _req.body;
            const valid = householdValidator.createModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.createModel.validate.errors)
            }
            const parentExists = await databaseService.household.get(data.parentId)
            if (!parentExists) {
                return _res.status(400).send({errorMessages: [{message: `Parent with id [${data}] does not exist`}]})
            }
            if (parentExists.errorMessages) {
                return _res.status(400).send(parentExists)
            }
            const household = databaseService.household.create(data.name, data.ownerID, data.membersIDs, data.balance)
            return _res.send(household);
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
    async update (_req, _res) {
        try {
            const data = _req.body
            const valid = householdValidator.updateModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.updateModel.validate.errors)
            }
            const response = databaseService.household.update(data.name, data.ownerID, data.membersIDs, data.balance, data.parentId) 
            if (response.errorMessages) {
                return _res.status(400).send(response)
            }
            return _res.send(response);
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
    async delete (_req, _res) {
        try {
            const data = _req.params.id
            const valid = householdValidator.identifierModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.identifierModel.validate.errors)
            }
            const response = databaseService.household.delete(data)
            if (response.errorMessages) {
                return _res.status(400).send(response)
            }
            return _res.send();
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
   /* async AddMember (_req, _res) { // Řešení pro přidání člena do domácnosti má být řešeno v domácnosti?
        try {
            const data = _req.params.id
            const valid = householdValidator.addMemberModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.addMemberModel.validate.errors)
            }
            const household = databaseService.household.addMember(data.id, data.memberID)
            return _res.send(household);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
}*/}

module.exports = new HouseholdController()