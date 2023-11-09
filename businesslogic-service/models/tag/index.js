const Ajv = require("ajv")
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
        authorID: {type: "string", minLength: 24, maxLength: 24},
        transactionID: {type: "string", minLength: 24, maxLength: 24},
        tagName: {type: "string", minLength: 1},
    },
    required: ["authorID", "transactionID", "tagName"],
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
        authorID: {type: "string", minLength: 24, maxLength: 24},
        transactionID: {type: "string", minLength: 24, maxLength: 24},
        tagName: {type: "string", minLength: 1},
    },
    additionalProperties: false
};

module.exports = {
    findIdModel: {
        validate: ajv.compile(findIdModel)
    },
    listModel: {
        validate: ajv.compile(listModel)
    },
    createModel: {
        validate: ajv.compile(createModel),
    },
    deleteModel: {
        validate: ajv.compile(deleteModel)
    },
    updateModel: {
        validate: ajv.compile(updateModel)
    }
}

