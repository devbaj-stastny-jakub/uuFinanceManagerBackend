const Ajv = require("ajv")
const ajv = new Ajv()
const identifierModel = {
    type: "string",
    maxLength: 24,
    minLength: 24
}
const listModel = {
    type: "object",
    properties: {
        limit: {
            type: "string",
        },
        parentId: {
            type: "string",
            maxLength: 24,
            minLength: 24
        }
    },
    additionalProperties: false
}

const createModel = {
    type: "object",
    properties: {
        parentId: {
            type: "string",
            maxLength: 24,
            minLength: 24
        },
        tags: {
            type: "array",
             items: {
                 type: "string",
                 maxLength: 24,
                 minLength: 24
             }
        },
        value: {
            type: "number"
        },
        description: {
            type: ["string", "null"],
        },
        counterpartId: {
            type: ["string", "null"],
            maxLength: 24,
            minLength: 24
        }
    },
    required: ["parentId", "value"],
    additionalProperties: false
}

const updateModel = {
    type: "object",
    properties: {
        id: {
            type: "string",
            maxLength: 24,
            minLength: 24
        },
        tags: {
            type: "array",
            items: {
                type: "string",
                maxLength: 24,
                minLength: 24
            }
        },
        value: {
            type: "number"
        },
        description: {
            type: ["string", "null"],
        },
    },
    required: ["id"],
    additionalProperties: false
}

module.exports = {
    listModel: {
        validate: ajv.compile(listModel),
    },
    createModel: {
        validate: ajv.compile(createModel),
    },
    updateModel: {
        validate: ajv.compile(updateModel),
    },
    identifierModel: {
        validate: ajv.compile(identifierModel)
    }
}
