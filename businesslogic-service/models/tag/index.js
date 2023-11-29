const Ajv = require("ajv")
const {ThrowableError, buildErrorMessage, responseErrorCodes} = require("../../errors");
const ajv = new Ajv()

const findIdModel = {
    type: "string",
    minLength: 24,
    maxLength: 24,
};
const listModel = {
    type: "object",
    properties: {
        tagName: {
            type: "string",
            minLength: 1
        },
        authorID: {
            type: "string",
            maxLength: 24,
            minLength: 24
        },
        transactionID: {
            type: "string",
            maxLength: 24,
            minLength: 24
        }
    },
    additionalProperties: false
};

const createModel = {
    type: "object",
    properties: {
        tagName: {type: "string", minLength: 1},
        createdAt: {type: "string"},
    },
    required: ["tagName",],
    additionalProperties: false,
};

const deleteModel = {
    type: "string",
    minLength: 24,
    maxLength: 24,
};
const updateModel = {
    type: "object",
    properties: {
        tagName: {type: "string", minLength: 1},
    },
    required: ["tagName",],
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
    findIdModel: {
        validate:(data)=>{handleValidation(findIdModel,data)}
    },
    listModel:{
        validate:(data)=>{handleValidation(listModel,data)}

    },
    createModel: {
        validate:(data)=>{handleValidation(createModel,data)}

    },
    deleteModel: {
        validate:(data)=>{handleValidation(deleteModel,data)}

    },
    updateModel: {
        validate:(data)=>{handleValidation(updateModel,data)}
    }
}

