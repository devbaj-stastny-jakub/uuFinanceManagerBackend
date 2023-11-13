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

const createModel = {
    type: "object",
    properties: {
        name: { 
            type: "string",
            maxLength: 255,
            minLength: 1
         },
        ownerID: {
            type: "string",
            minLength: 1,
        id: { 
            type: "string",
            maxLength: 24,
            minLength: 24
        },   
        },
        membersIDs: {
            type: "array",
            items: {
                type: "string",
                minLength: 24,
                maxLength: 24
            },
        maxItems: 10, // max 10 members?
        },
        balance: {
            type: "number",
        },
    },
    required: ["name", "ownerID", "membersIDs", "balance"],
    additionalProperties: false
}

const updateModel = {
    type: "object",
    properties: {
      name: {
        type: "string",
        maxLength: 255,
        minLength: 1
      },
      id: { 
        type: "string",
        maxLength: 24,
        minLength: 24
     },   
      ownerID: {
        type: "string",
        maxLength: 24,
        minLength: 24
      },
      membersIDs: {
        type: "array",
        items: {
          type: "string",
          maxLength: 24,
          minLength: 24
        },
        maxItems: 10 // max 10 members?
      },
      balance: {
        type: "number",
      },
    },
    additionalProperties: false
  };

const deleteModel = {
    type: "object",
    properties: {
        id: { 
            type: "string",
            maxLength: 24,
            minLength: 24
         },   
    },
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
    deleteModel: {
        validate: ajv.compile(deleteModel),
    }
}
