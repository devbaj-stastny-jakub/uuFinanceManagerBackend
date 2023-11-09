const tagValidator = require("../../models/tag")

class TagController {
    async list(_req, _res){
        try {
            const data = _req.query;
            const valid = tagValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(tagValidator.listModel.validate.errors)
            }
            const list = await databaseService.transaction.list(data.limit, data.parentId)
            return list;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async delete(_req, _res){
        try {
            const data = _req.query;
            const valid = tagValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(tagValidator.listModel.validate.errors)
            }
            const list = await databaseService.transaction.list(data.limit, data.parentId)
            return list;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
}

module.exports = new TagController()
