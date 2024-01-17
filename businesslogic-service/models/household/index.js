const Ajv = require('ajv');
const ajv = new Ajv();
const { ThrowableError, buildErrorMessage, responseErrorCodes } = require('../../errors');

const listModel = {
	type: 'object',
	properties: {},
	additionalProperties: false,
};

const statisticsModel = {
	type: 'object',
	properties: {
		parentId: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
		userId: {
			type: 'string',
		},
		tagId: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
		period: {
			type: 'string',
		},
		positive: {
			type: 'string',
			enum: ["true", "false"],
		}
	},
	required: ['parentId'],
	additionalProperties: false,
};

const createModel = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
		},
		expenses: {
			type: 'number',
		},
		incomes: {
			type: 'number',
		},
	},
	required: ['name'],
	additionalProperties: false,
};

const identifierModel = {
	type: 'string',
	maxLength: 24,
	minLength: 24,
};

const updateModel = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			maxLength: 255,
			minLength: 1,
		},
		id: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
		ownerId: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
		expenses: {
			type: 'number',
		},
		incomes: {
			type: 'number',
		},
		membersIds: {
			type: 'array',
			items: {
				type: 'string',
				maxLength: 24,
				minLength: 24,
			},
		},
		balance: {
			type: 'number',
		},
	},
	required: ['id'],
	additionalProperties: false,
};

// přidání addMember modelu?

const handleValidation = (model, data) => {
	const validate = ajv.compile(model);
	const valid = validate(data);
	if (!valid) {
		throw ThrowableError(
			buildErrorMessage(
				responseErrorCodes.VALIDATION_ERROR,
				`${validate.errors[0].message} - ${(validate.errors[0].params[Object.keys(validate.errors[0].params)[0]]).toString()}`
			),
			undefined,
			400
		);
	}
};

module.exports = {
	listModel: {
		validate: (data) => {
			handleValidation(listModel, data);
		},
	},
	statisticsModel: {
		validate: (data) => {
			handleValidation(statisticsModel, data);
		},
	},
	createModel: {
		validate: (data) => {
			handleValidation(createModel, data);
		},
	},
	updateModel: {
		validate: (data) => {
			handleValidation(updateModel, data);
		},
	},
	identifierModel: {
		validate: (data) => {
			handleValidation(identifierModel, data);
		},
	},
};
