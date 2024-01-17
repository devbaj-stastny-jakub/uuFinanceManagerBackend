const databaseService = require('../../services/databaseService');
const transactionValidator = require('../../models/transaction');
const { responseErrorCodes, ErrorMessage, buildErrorMessage, ThrowableError } = require('../../errors');

class TransactionController {
	objectName = 'transaction';

	async list(_req, _res, next) {
		try {
			const data = _req.query;
			transactionValidator.listModel.validate(data);
			const response = await databaseService.transaction.list(data);
			if (response.errorCode)
				throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName), undefined, 400);
			return _res.send(response);
		} catch (e) {
			next(e);
		}
	}

	async analyze(_req, _res, next) {
		try {
			const data = _req.query;
			console.log(data)
			transactionValidator.analyzeModel.validate(data);
			const household = await databaseService.household.get(data.parentId);
			if (!household)
				throw ThrowableError(
					buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data.parentId),
					undefined,
					400
				);
			if (household.errorCode)
				throw ThrowableError(buildErrorMessage(household.errorCode, this.objectName, data), undefined, 400);
			const response = await databaseService.transaction.analyze(data);
			if (response.errorCode)
				throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName), undefined, 400);
			return _res.send(response);
		} catch (e) {
			console.log(e)
			next(e);
		}
	}

	async create(_req, _res, next) {
		try {
			const data = _req.body;
			transactionValidator.createModel.validate(data);
			let parent = await databaseService.household.get(data.parentId);
			if (parent.errorCode)
				throw ThrowableError(
					buildErrorMessage(parent.errorCode, this.objectName, data.parentId),
					undefined,
					400
				);
			if (!parent) {
				parent = await databaseService.saving.get({ id: data.parentId });
				if (parent.errorCode)
					throw ThrowableError(
						buildErrorMessage(parent.errorCode, this.objectName, data.parentId),
						undefined,
						400
					);
				if (!parent)
					throw ThrowableError(
						buildErrorMessage(responseErrorCodes.NOT_FOUND, 'parent', data.parentId),
						undefined,
						400
					);
			}
			if (
				!(await getIsAuthorized(_req.auth?.payload.sub, parent.ownerId ? data.parentId : parent.householdId, [
					'owner',
					'member',
				]))
			)
				throw ThrowableError(
					buildErrorMessage(
						responseErrorCodes.NOT_AUTHORIZED,
						'household',
						parent.ownerId ? data.parentId : parent.householdId
					),
					undefined,
					401
				);
			const transaction = await databaseService.transaction.create(data, _req.auth.payload.sub);
			if (transaction.errorCode)
				throw new Error(undefined, { cause: buildErrorMessage(transaction.errorCode, this.objectName) });
			return _res.send(transaction);
		} catch (e) {
			console.log(e);
			next(e);
		}
	}

	async get(_req, _res, next) {
		try {
			const data = _req.params.id;
			transactionValidator.identifierModel.validate(data);
			const transaction = await databaseService.transaction.get(data);
			if (!transaction)
				throw ThrowableError(
					buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data),
					undefined,
					400
				);
			if (transaction.errorCode)
				throw ThrowableError(buildErrorMessage(transaction.errorCode, this.objectName, data), undefined, 400);
			return _res.send(transaction);
		} catch (e) {
			next(e);
		}
	}

	async delete(_req, _res, next) {
		try {
			const data = _req.params.id;
			transactionValidator.identifierModel.validate(data);
			const response = await databaseService.transaction.delete(data);
			if (response.errorCode)
				throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data), undefined, 400);
			return _res.send();
		} catch (e) {
			next(e);
		}
	}

	async update(_req, _res, next) {
		try {
			const data = _req.body;
			transactionValidator.updateModel.validate(data);
			const response = await databaseService.transaction.update(data.id, { ...data, id: undefined });
			if (response.errorCode)
				throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data.id), undefined, 400);
			return _res.send(response);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new TransactionController();
