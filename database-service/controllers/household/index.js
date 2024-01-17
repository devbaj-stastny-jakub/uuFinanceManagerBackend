const { client } = require('../../mongodb-connection');
const config = require('../../config');
const { ObjectId } = require('mongodb');
const { responseErrorCodes } = require('../../errors');
const moment = require('moment');

class HouseholdController {
	async get(_req, _res) {
		const id = _req.params.id;
		try {
			const result = await client
				.db(config.database.name)
				.collection(config.database.collection.households)
				.findOne({
					_id: new ObjectId(id),
				});
			return _res.send(result);
		} catch (exception) {
			console.log(exception);
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}

	async updateBalance(id) {
		try {
			const isHousehold = await client
				.db(config.database.name)
				.collection(config.database.collection.households)
				.findOne({ _id: new ObjectId(id) });
			let balance = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.aggregate([
					{
						$match: {
							parentId: id,
						},
					},
					{
						$group: {
							_id: '$parentId',
							totalValue: { $sum: '$value' },
						},
					},
				])
				.toArray();
			balance = balance[0].totalValue;
			let inValue = undefined;
			let outValue = undefined;
			if (isHousehold) {
				let incomes = await client
					.db(config.database.name)
					.collection(config.database.collection.transactions)
					.aggregate([
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
								parentId: id,
								value: {
									$gte: 0,
								},
								hasCounterPart: [],
							},
						},
						{
							$group: {
								_id: '$parentId',
								totalValue: { $sum: '$value' },
							},
						},
					])
					.toArray();
				inValue = incomes[0].totalValue;
				let outcomes = await client
					.db(config.database.name)
					.collection(config.database.collection.transactions)
					.aggregate([
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
								parentId: id,
								value: {
									$lte: 0,
								},
								hasCounterPart: [],
							},
						},
						{
							$group: {
								_id: '$parentId',
								totalValue: { $sum: '$value' },
							},
						},
					])
					.toArray();
				outValue = outcomes[0].totalValue;
			}
			await client
				.db(config.database.name)
				.collection(config.database.collection[isHousehold ? 'households' : 'saving'])
				.updateOne(
					{
						_id: new ObjectId(id),
					},
					{
						$set: {
							...(isHousehold ? { balance } : { currentBalance: balance }),
							...(isHousehold ? { expenses: outValue, incomes: inValue } : {}),
						},
					}
				);
		} catch (exception) {
			console.log(exception);
		}
	}

	async statistics(_req, _res) {
		const data = _req.query;
		const filter = {
			creator: data.userId,
			positive: data.positive === 'false' ? false : true,
			parent: data.parentId,
			period: data.period ? Number(data.period) : undefined,
			tag: data.tagId,
		};
		try {
			const result = await client
				.db(config.database.name)
				.collection(config.database.collection.transactions)
				.aggregate([
					{
						$lookup: {
							from: 'tag',
							localField: 'tags',
							foreignField: '_id',
							as: 'tags',
						},
					},
					{
						$match: {
							value: filter.positive ? { $gt: 0 } : { $lt: 0 },
							...(filter.parent ? { parentId: filter.parent } : {}),
							...(filter.creator ? { creatorId: filter.creator } : {}),
							...(filter.tag ? { tags: { $elemMatch: { _id: new ObjectId(filter.tag) } } } : {}),
							...(filter.period ? { createdAt: { $gte: Math.floor((Date.now() - filter.period * 24 * 60 * 60 * 1000) / 1000) } } : {}),
						},
					},
					{
						$group: {
							_id: '$creatorId',
							y: { $sum: '$value' },
						},
					},
				])
				.toArray();
			return _res.send(result);
		} catch (e) {
			console.log(e);
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}

	async list(_req, _res) {
		const userId = _req.query.userId;
		try {
			const result = await client
				.db(config.database.name)
				.collection(config.database.collection.households)
				.find({
					$or: [
						{
							ownerId: userId,
						},
						{
							membersIds: {
								$elemMatch: {
									$eq: userId,
								},
							},
						},
					],
				})
				.limit(_req.query.limit ? parseInt(_req.query.limit) : 0)
				.toArray();
			return _res.send(result);
		} catch (exception) {
			console.log(exception);
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}

	async create(_req, _res) {
		const data = _req.body;
		try {
			const defaultModel = {
				name: 'New household',
				ownerId: '',
				membersIds: [],
				balance: 0,
				expenses: 0,
				incomes: 0,
				createdAt: parseInt(moment().format('X')),
				updatedAt: parseInt(moment().format('X')),
				...data,
			};
			const result = await client.db(config.database.name).collection(config.database.collection.households).insertOne(defaultModel);
			const result2 = await client
				.db(config.database.name)
				.collection(config.database.collection.households)
				.findOne({
					_id: new ObjectId(result.insertedId),
				});
			return _res.send(result2);
		} catch (exception) {
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}

	async patch(_req, _res) {
		const data = _req.body;
		const id = _req.params.id;
		try {
			const result = await client
				.db(config.database.name)
				.collection(config.database.collection.households)
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
				.collection(config.database.collection.households)
				.findOne({
					_id: new ObjectId(id),
				});
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
				.collection(config.database.collection.households)
				.deleteOne({
					_id: new ObjectId(id),
				});
			if (result.deletedCount === 0) {
				return _res.status(400).send({ errorCode: responseErrorCodes.USER_NOT_FOUND });
			}
		} catch (exception) {
			_res.status(500).send({ errorCode: responseErrorCodes.UNKNOWN_ERROR });
		}
	}
}

module.exports = new HouseholdController();
