const {client} = require("../../mongodb-connection")
const config = require("../../config")
const {ObjectId} = require("mongodb");
const {responseErrorCodes} = require("../../errors")
const moment = require("moment/moment");

class SavingController {

    async get(_req, _res) {
        const id = _req.params.id
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.saving)
                .findOne({
                    _id: new ObjectId(id)
                })
            return _res.send(result)
        } catch (exception) {
            _res.status(500).send({errorCode: responseErrorCodes.UNKNOWN_ERROR})        }
    }
    async list(_req, _res) {
        const userId = _req.query.userId
        try {
            const results = await client
                .db(config.database.name)
                .collection(config.database.collection.saving)
                .find({
                    householdId: _req.query.householdId
                }).limit(_req.query.limit ? parseInt(_req.query.limit) : 0).toArray()
            const authResults = []
            for(let item of results) {
                const authorized = await this.hasAuthorizedHousehold(_req.query.householdId, userId)
                if(authorized) authResults.push(item)
            }
            return _res.send(authResults)
        } catch (exception) {
            _res.status(500).send({errorCode: responseErrorCodes.UNKNOWN_ERROR})
        }
    }
    async hasAuthorizedHousehold(id, userId) {
        const results = await client
            .db(config.database.name)
            .collection(config.database.collection.households)
            .find({
                $or: [
                    {
                        _id: new ObjectId(id),
                        ownerId: userId
                    },
                    {
                        _id: new ObjectId(id),
                        membersIds: {
                            $elemMatch: {
                                $eq: userId
                            }
                        }
                    }
                ]
            }).toArray()
        return !!results.length
    }

    async create(_req, _res) {
        const data = _req.body
        const defaultModel = {
            name: 'New saving',
            goal: 1,
            description: "",
            householdId: "",
            currentBalance: 0,
            createdAt: parseInt(moment().format("X")),
            updatedAt: parseInt(moment().format("X")),
            ...data,
        };
        try {
            const result = await client
                .db(config.database.name)
                .collection(config.database.collection.saving)
                .insertOne(defaultModel)
            const result2 = await client
                .db(config.database.name)
                .collection(config.database.collection.saving)
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
                .collection(config.database.collection.saving)
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
                .collection(config.database.collection.saving)
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
                .collection(config.database.collection.saving)
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
module.exports = new SavingController()
