const Ajv = require("ajv");
const ajv = new Ajv();
const {ThrowableError, buildErrorMessage, responseErrorCodes} = require("../../errors");

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