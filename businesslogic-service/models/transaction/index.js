const Ajv = require('ajv');
const { ThrowableError, buildErrorMessage, responseErrorCodes } = require('../../errors');
const ajv = new Ajv();
const identifierModel = {
	type: 'string',
	maxLength: 24,
	minLength: 24,
};
const listModel = {
	type: 'object',
	properties: {
		limit: {
			type: 'string',
		},
		parentId: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
	},
	additionalProperties: false,
};

const analyzeModel = {
	type: 'object',
	properties: {
		period: {
			type: 'string',
			enum: ['unlimited', 'week', 'month', 'qartal'],
		},
		parentId: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
	},
	additionalProperties: false,
};

const createModel = {
	type: 'object',
	properties: {
		parentId: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
		tags: {
			type: 'array',
			items: {
				type: 'string',
				maxLength: 24,
				minLength: 24,
			},
		},
		value: {
			type: 'number',
		},
		description: {
			type: ['string', 'null'],
		},
		counterpartId: {
			type: ['string', 'null'],
			maxLength: 24,
			minLength: 24,
		},
	},
	required: ['parentId', 'value'],
	additionalProperties: false,
};

const updateModel = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			maxLength: 24,
			minLength: 24,
		},
		tags: {
			type: 'array',
			items: {
				type: 'string',
				maxLength: 24,
				minLength: 24,
			},
		},
		value: {
			type: 'number',
		},
		description: {
			type: ['string', 'null'],
		},
	},
	required: ['id'],
	additionalProperties: false,
};

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
	analyzeModel: {
		validate: (data) => {
			handleValidation(analyzeModel, data);
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
