const Ajv = require("ajv")
const {ThrowableError, buildErrorMessage, responseErrorCodes} = require("../../errors");
const ajv = new Ajv()

const identifierModel = {
    type: "string",
    minLength: 24,
    maxLength: 24,
};

const listModel = {
    type: "object",
    properties: {
        savingName: {
            type: "string",
            minLength: 1
        },
        householdId: {
            type: "string",
            minLength: 24,
            maxLength: 24
        },
    },
    required: ["householdId"],
    additionalProperties: false
};

const createModel = {
    type: "object",
    properties: {
        householdId: {
            type: "string",
            minLength: 24,
            maxLength: 24
        },
        name: {type: "string", minLength: 1},
        goal: {type: "integer", exclusiveMinimum: 1},
        description: {type: "string", minLength: 1},
    },
    required: ["name", "goal", "householdId"],
    additionalProperties: false,
};

const updateModel = {
    type: "object",
    properties: {
        id: {
            type: "string",
            minLength: 24,
            maxLength: 24
        },
        name: {type: "string", minLength: 1},
        goal: {type: "integer"},
        description: {type: "string", minLength: 1},
    },
    required: ["id"],
    additionalProperties: false
};

const handleValidation = (model, data)=>{
    const validate = ajv.compile(model)
    const valid = validate(data)
    if(!valid) {
        throw ThrowableError(buildErrorMessage(responseErrorCodes.VALIDATION_ERROR, validate.errors[0].message), undefined, 400)
    }
}

module.exports = {
    listModel: {
        validate: (data)=>{handleValidation(listModel, data)},
    },
    createModel: {
        validate: (data)=>{handleValidation(createModel, data)},
    },
    updateModel: {
        validate: (data)=>{handleValidation(updateModel, data)},
    },
    identifierModel: {
        validate: (data)=>{handleValidation(identifierModel, data)},
    }
}

