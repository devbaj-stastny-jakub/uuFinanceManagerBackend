const Ajv = require("ajv");
const ajv = new Ajv();

const listModel = {
  type: "object",
  properties: {
    limit: {
      type: "string",
    },
    id: {
      type: "string",
      maxLength: 24,
      minLength: 24,
    },
  },
  additionalProperties: false,
};

const createModel = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
  required: ["name"],
  additionalProperties: false,
};

const identifierModel = {
  type: "string",
  maxLength: 24,
  minLength: 24,
};

const updateModel = {
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 255,
      minLength: 1,
    },
    id: {
      type: "string",
      maxLength: 24,
      minLength: 24,
    },
    ownerID: {
      type: "string",
      maxLength: 24,
      minLength: 24,
    },
    membersIDs: {
      type: "array",
      items: {
        type: "string",
        maxLength: 24,
        minLength: 24,
      },
    },
    balance: {
      type: "number",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

// přidání addMember modelu?

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
    validate: ajv.compile(identifierModel),
  },
};
