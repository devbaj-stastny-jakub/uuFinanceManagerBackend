// importovat databaseService
// importovat householdValidator
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
}

module.exports = new HouseholdController()