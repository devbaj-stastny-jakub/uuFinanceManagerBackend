const Ajv = require("ajv")
const ajv = new Ajv()

const createModel = {
    type: "object",
    properties: {
        authorID: { type: "string", minLength: 24, maxLength: 24 },
        transactionID: { type: "string", minLength: 24, maxLength: 24},
        tagName: { type: "string", minLength: 1},
    },
    required: ["authorID", "transactionID", "tagName"],
    additionalProperties: false,
};

const deleteModel = {
    type: "string",
    minLength: 24,
    maxLength: 24,
};

module.exports = {
    createModel: {
        validate: ajv.compile(createModel),
    deleteModel:{
            validate: ajv.compile(deleteModel)
    }
    }
}
module.exports = deleteModel;
