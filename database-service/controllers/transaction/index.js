const { client } = require('../../mongodb-connection');
const config = require('../../config');
const { ObjectId } = require('mongodb');
const { responseErrorCodes } = require('../../errors');
const householdController = require("../household")

const { calculateAnalyticsForYearPeriod, calculateAnalyticsForDaysPeriod } = require('./methods');
const moment = require("moment")

class TransactionController {
	async get(_req, _res) {
		const id = _req.params.id;
		try {
			const result = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.findOne({
					_id: new ObjectId(id),
				});
			return _res.send(result);
		} catch (exception) {
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}

	async analyze(_req, _res) {
		try {
			const period = _req.query.period;
			const dataset = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.aggregate([
					{
						$sort: {
							createdAt: 1
						}
					},
					{
						$lookup: {
							from: 'transactions',
							localField: '_id',
							foreignField: 'counterpartId',
							as: 'hasCounterPart',
						},
					},
					{
						$match: {
							parentId: _req.query.parentId,
							hasCounterPart: [],
						},
					},
				])
				.toArray();
			const periodValues = {
				unlimited: undefined,
				week: 7,
				month: 30,
				qartal: 90,
			};
			const periodMethods = {
				unlimited: calculateAnalyticsForYearPeriod,
				week: calculateAnalyticsForDaysPeriod,
				month: calculateAnalyticsForDaysPeriod,
				qartal: calculateAnalyticsForDaysPeriod,
			};
			const results = periodMethods[period](dataset, periodValues[period]);
			return _res.send(results);
		} catch (exception) {
			console.log(exception);
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}

	async list(_req, _res) {
		const filter = {
			parentId: _req.query.parentId,
		};
		try {
			const result = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.find(filter)
				.limit(_req.query.limit ? parseInt(_req.query.limit) : 0)
				.toArray();
			return _res.send(result);
		} catch (exception) {
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}

	async create(_req, _res) {
		let data = _req.body;
		data = {
			parentId: null,
			tags: [],
			value: 0,
			description: null,
			counterpartId: null,
			...data,
			createdAt: parseInt(moment().format('X')),
			updatedAt: parseInt(moment().format('X')),
		};
		try {
			const result = await client.db(config.database.name).collection(config.database.collection.transactions).insertOne(data);
			const result2 = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.findOne({
					_id: new ObjectId(result.insertedId),
				});
			return _res.send(result2);
		} catch (exception) {
			console.log('test: ', exception);
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		} finally {
			householdController.updateBalance(data.parentId)
		}
	}

	async patch(_req, _res) {
		const data = _req.body;
		const id = _req.params.id;
		try {
			const result = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.updateOne(
					{
						_id: new ObjectId(id),
					},
					{
						$set: data,
					}
				);
			if (result.matchedCount === 0) {
				return _res.status(400).send({ errorCode: responseErrorCodes.NOT_FOUND });
			}
			const result2 = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.findOne({
					_id: new ObjectId(id),
				});
			householdController.updateBalance(result2.parentId)
			return _res.send(result2);
		} catch (exception) {
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}

	async delete(_req, _res) {
		const id = _req.params.id;
		try {
			const result = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.deleteOne({
					_id: new ObjectId(id),
				});
			if (result.deletedCount === 0) {
				return _res.status(400).send({ errorCode: responseErrorCodes.NOT_FOUND });
			}
			return _res.send(result);
		} catch (exception) {
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}
}

module.exports = new TransactionController();
