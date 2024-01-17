const householdValidator = require('../../models/household');
const databaseService = require('../../services/databaseService');
const { responseErrorCodes, ErrorMessage, buildErrorMessage, ThrowableError } = require('../../errors');
const getIsAuthorized = require('../../helper/auth');

class HouseholdController {
	objectName = 'household';

	async list(_req, _res, next) {
		try {
			const response = await databaseService.household.list(_req.auth.payload.sub);
			if (response.errorCode)
				throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName), undefined, 400);
			return _res.send(response);
		} catch (e) {
			next(e);
		}
	}

	async statistics(_req, _res, next) {
		try {
			const data = _req.query;
			householdValidator.statisticsModel.validate(data);
			const household = await databaseService.household.get(data.parentId);
			if (!household)
				throw ThrowableError(
					buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data.parentId),
					undefined,
					400
				);
			if (household.errorCode)
				throw ThrowableError(buildErrorMessage(household.errorCode, this.objectName, data), undefined, 400);
			if (!(await getIsAuthorized(_req.auth?.payload.sub, data.parentId, ['owner', 'member'])))
				throw ThrowableError(
					buildErrorMessage(responseErrorCodes.NOT_AUTHORIZED, this.objectName, data.parentId),
					undefined,
					401
				);
			const statistics = await databaseService.household.statistics(data);
			return _res.send(statistics);
		} catch (e) {
			next(e);
		}
	}

	async get(_req, _res, next) {
		try {
			const data = _req.params.id;
			householdValidator.identifierModel.validate(data);
			const household = await databaseService.household.get(data);
			if (!household)
				throw ThrowableError(
					buildErrorMessage(responseErrorCodes.NOT_FOUND, this.objectName, data),
					undefined,
					400
				);
			if (household.errorCode)
				throw ThrowableError(buildErrorMessage(household.errorCode, this.objectName, data), undefined, 400);
			if (!(await getIsAuthorized(_req.auth?.payload.sub, data, ['owner', 'member'])))
				throw ThrowableError(
					buildErrorMessage(responseErrorCodes.NOT_AUTHORIZED, this.objectName, data),
					undefined,
					401
				);
			return _res.send(household);
		} catch (e) {
			console.log(e);
			next(e);
		}
	}
	async create(_req, _res, next) {
		try {
			const data = _req.body;
			householdValidator.createModel.validate(data);
			const response = await databaseService.household.create(data, _req.auth.payload.sub);
			if (response.errorCode)
				throw new Error(undefined, { cause: buildErrorMessage(household.errorCode, this.objectName) });
			return _res.send(response);
		} catch (e) {
			next(e);
		}
	}
	async update(_req, _res, next) {
		try {
			const data = _req.body;
			householdValidator.updateModel.validate(data);
			if (!(await getIsAuthorized(_req.auth?.payload.sub, data.id, ['owner'])))
				throw ThrowableError(
					buildErrorMessage(responseErrorCodes.NOT_AUTHORIZED, this.objectName, data.id),
					undefined,
					401
				);
			const response = await databaseService.household.update({ ...data, id: undefined }, data.id);
			if (response.errorCode)
				throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName, data.id), undefined, 400);
			return _res.send(response);
		} catch (e) {
			next(e);
		}
	}
	async delete(_req, _res, next) {
		try {
			const data = _req.params.id;
			householdValidator.identifierModel.validate(data);
			if (!(await getIsAuthorized(_req.auth?.payload.sub, data, ['owner'])))
				throw ThrowableError(
					buildErrorMessage(responseErrorCodes.NOT_AUTHORIZED, this.objectName, data),
					undefined,
					401
				);
			const response = await databaseService.household.delete(data);
			if (response.errorCode)
				throw ThrowableError(buildErrorMessage(response.errorCode, this.objectName), undefined, 400);
			return _res.send();
		} catch (e) {
			next(e);
		}
	}
	/* async AddMember (_req, _res) { // Řešení pro přidání člena do domácnosti má být řešeno v domácnosti?
        try {
            const data = _req.params.id
            const valid = householdValidator.addMemberModel.validate(data)
            if(!valid) {
                return _res.status(400).json(householdValidator.addMemberModel.validate.errors)
            }
            const household = databaseService.household.addMember(data.id, data.memberID)
            return _res.send(household);
        } catch (exception) {
            console.log(exception)
            _res.status(500).send(exception)
        }
    }
}*/
}

module.exports = new HouseholdController();
