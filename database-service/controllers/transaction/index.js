const {client} = require("../../mongodb-connection")
const config = require("../../config")
const {ObjectId} = require("mongodb");

class TransactionController {
    async get(_req, _res) {
        const id = _req.params.id
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.transactions)
                .findOne({
                    _id: new ObjectId(id)
                })
            return result;
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
    async list(_req, _res) {
        const data = _req.body
        const filter = {}
        if(data.parentId) filter.parentId = data.parentId
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.transactions)
                .find(filter).limit(data.limit ? data.limit : 0).toArray()
            return result;
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
    async create(_req, _res) {
        const data = _req.body
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.transactions)
                .insertOne(data)
            return result
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
    async patch(_req, _res) {
        const data = _req.body
        const id = _req.params.id
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.transactions)
                .updateOne({
                    _id: new ObjectId(id)
                }, {
                    $set: data
                })
            if(result.matchedCount === 0) {
                return _res.status(400).send({message: "There is not transaction with given id..."})
            }
            return result
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
    async delete(_req, _res) {
        const id = _req.params.id
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.transactions)
                .deleteOne({
                    _id: new ObjectId(id)
                })
            if(result.deletedCount === 0) {
                return _res.status(400).send({message: "There is not transaction with given id..."})
            }
            return result
        } catch (exception) {
            _res.status(500).send(exception)
        }
    }
}

module.exports = new TransactionController()
