const {client} = require("../../mongodb-connection")
const config = require("../../config")
const {ObjectId} = require("mongodb");
const {responseErrorCodes} = require("../../errors")

class TagController {

    async get(_req, _res) {
        const id = _req.params.id
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.tag)
                .findOne({
                    _id: new ObjectId(id)
                })
            return _res.send(result)
        } catch (exception) {
            _res.status(500).send({errorCode: responseErrorCodes.UNKNOWN_ERROR})        }
    }
    async list(_req, _res) {
        const filter = {}
        if (_req.query.transactionID) filter.transactionsID = _req.query.transactionID
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.tag)
                .find(filter).limit(_req.query.limit ? parseInt(_req.query.limit) : 0).toArray()
            return _res.send(result)
        } catch (exception) {
            _res.status(500).send({errorCode: responseErrorCodes.UNKNOWN_ERROR})
        }
    }
    async create(_req, _res) {
        const data = _req.body
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.tag)
                .insertOne(data)
            const result2 = await client
                .db(config.database.name)
                .collection(config.database.collection.tag)
                .findOne({
                    _id: new ObjectId(result.insertedId)
                })
            return _res.send(result2)
        } catch (exception) {
            _res.status(500).send({errorCode: responseErrorCodes.UNKNOWN_ERROR})
        }
    }

    async patch(_req, _res) {
        const data = _req.body
        const id = _req.params.id
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.tag)
                .updateOne({
                    _id: new ObjectId(id)
                }, {
                    $set: data
                })
            if (result.matchedCount === 0) {
                return _res.status(400).send({errorCode: responseErrorCodes.NOT_FOUND})
            }
            const result2 = await client
                .db(config.database.name)
                .collection(config.database.collection.tag)
                .findOne({
                    _id: new ObjectId(id)
                })
            return _res.send(result2)
        } catch (exception) {
            _res.status(500).send({errorCode: responseErrorCodes.UNKNOWN_ERROR})        }
    }
    async delete(_req, _res) {
        const id = _req.params.id
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.tag)
                .deleteOne({
                    _id: new ObjectId(id)
                })
            if (result.deletedCount === 0) {
                return _res.status(400).send({errorCode: responseErrorCodes.NOT_FOUND})
            }
            return _res.send(result)
        } catch (exception) {
            _res.status(500).send({errorCode: responseErrorCodes.UNKNOWN_ERROR})        }
    }
}
module.exports = new TagController()
