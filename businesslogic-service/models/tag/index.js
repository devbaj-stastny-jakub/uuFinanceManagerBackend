const Ajv = require('ajv');
const { ThrowableError, buildErrorMessage, responseErrorCodes } = require('../../errors');
const ajv = new Ajv();

const findIdModel = {
	type: 'string',
	minLength: 24,
	maxLength: 24,
};
const listModel = {
	type: 'object',
	properties: {
		householdId: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
	},
	required: ['householdId'],
	additionalProperties: false,
};

const createModel = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 1 },
		householdId: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
	},
	required: ['name', 'householdId'],
	additionalProperties: false,
};

const deleteModel = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			minLength: 24,
			maxLength: 24,
		},
	},
};
const updateModel = {
	type: 'object',
	properties: {
		id: { type: 'string', minLength: 24, maxLength: 24 },
		tag: { type: 'string', minLength: 1 },
	},
	required: ['id'],
	additionalProperties: false,
};
const handleValidation = (model, data) => {
	const validate = ajv.compile(model);
	const valid = validate(data);
	if (!valid) {
		throw ThrowableError(buildErrorMessage(responseErrorCodes.VALIDATION_ERROR, validate.errors[0].message), undefined, 400);
	}
};

module.exports = {
	findIdModel: {
		validate: (data) => {
			handleValidation(findIdModel, data);
		},
	},
	listModel: {
		validate: (data) => {
			handleValidation(listModel, data);
		},
	},
	createModel: {
		validate: (data) => {
			handleValidation(createModel, data);
		},
	},
	deleteModel: {
		validate: (data) => {
			handleValidation(deleteModel, data);
		},
	},
	updateModel: {
		validate: (data) => {
			handleValidation(updateModel, data);
		},
	},
};
