const Ajv = require("ajv")
const ajv = new Ajv()

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

module.exports = {
    listModel: {
        validate: ajv.compile(listModel),
    }
}
