const tagValidator = require("../../models/tag")
const databaseService = require("../../services/databaseService")



class TagController {
    async list(_req, _res){
        try {
            const data = _req.query;
            const valid = tagValidator.listModel.validate(data)
            if(!valid) {
                return _res.status(400).json(tagValidator.listModel.validate.errors)
            }
            const list = await databaseService.tag.list(data)
            return list;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async get(_req, _res) {
        try {
            const data = _req.params.id
            const valid = tagValidator.findIdModel.validate(data)
            if (!valid) {
                return _res.status(400).json(tagValidator.findIdModel.validate.errors)
            }
            const tag = await databaseService.tag.get(data)
            return tag;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async create(_req, _res) {
        try {
            const data = _req.body;
            const valid = tagValidator.createModel.validate(data)
            if(!valid) {
                return _res.status(400).json(tagValidator.createModel.validate.errors)
            }
            const create = await databaseService.tag.create(data)
            return _res.send(create);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async update (_req, _res) {
        try {
            const data = _req.body
            const valid = tagValidator.updateModel.validate(data)
            if(!valid) {
                return _res.status(400).json(tagValidator.updateModel.validate.errors)
            }
            const update = await databaseService.tag.update(data)
            console.log("update", update)
            return update;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
    async delete(_req, _res){
        try {
            const data = _req.query;
            const valid = tagValidator.deleteModel.validate(data)
            if(!valid) {
                return _res.status(400).json(tagValidator.deleteModel.validate.errors)
            }
            const deleted = await databaseService.tag.delete(data)
            return deleted;
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
}

module.exports = new TagController()
