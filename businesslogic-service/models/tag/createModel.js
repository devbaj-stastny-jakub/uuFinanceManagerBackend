let createModel = {
    type: "object",
    properties: {
        authorID: { type: "string", minLength: 1 },
        transactionID: { type: "string", minLength: 1 },
        tagName: { type: "string", exclusiveMinimum: 0, maximum: 50 },
    },
    required: ["authorID", "transactionID", "tagName"],
    additionalProperties: false,
};
module.exports = createModel;