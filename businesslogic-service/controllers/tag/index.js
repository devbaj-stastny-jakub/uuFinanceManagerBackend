const tagValidator = require("../../models/tag")
const databaseService = require("../../services/databaseService")
const {responseErrorCodes, ErrorMessage, buildErrorMessage, ThrowableError} = require("../../errors")





class TagController {
    objectName = "tag"

    async list(_req, _res, next) {
        try {
            const data = _req.query;
            tagValidator.listModel.validate(data)
            const response = await databaseService.tag.list(data)
            if (response.errorCode) throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName), undefined, 400)
            return _res.send(response);
        } catch (e) {
            next(e)
        }
    }
    async get(_req, _res, next) {
        try {
            const data = _req.params.id
            tagValidator.identifierModel.validate(data)
            const tag = await databaseService.tag.get(data)
            if (!tag) throw ThrowableError(buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data), undefined, 400)
            if (tag.errorCode) throw ThrowableError(buildErrorMessage(tag.errorCode, this.objectName, data), undefined, 400)
            return _res.send(tag)
        } catch (e) {
            next(e)
        }
    }
    async create(_req, _res, next) {
        try {
            const data = _req.body
            tagValidator.createModel.validate(data)
            const tag = await databaseService.tag.create(data)
            if (tag.errorCode) throw new Error(undefined, {cause: buildErrorMessage(tag.errorCode, this.objectName)})
            return _res.send(tag)
        } catch (e) {
            next(e)
        }
    }

    async update(_req, _res, next) {
        try {
            const data = _req.body
            tagValidator.updateModel.validate(data)
            const response = await databaseService.tag.update(data.id, {...data, id: undefined})
            if (response.errorCode) throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data.id), undefined, 400)
            return _res.send(response)
        } catch (e) {
            next(e)
        }
    }
    async delete(_req, _res, next) {
        try {
            const data = _req.body
            tagValidator.deleteModel.validate(data)
            const response = await databaseService.tag.delete(data.id)
            if (response.errorCode) throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data.id), undefined, 400)
            return _res.send()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TagController()
