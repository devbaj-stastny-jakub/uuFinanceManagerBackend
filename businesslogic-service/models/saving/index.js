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
        savingName: {type: "string", minLength: 1},
        goal: {type: "integer"},
        description: {type: "string", minLength: 1},
        createdAt: {type: "string"},
        updatedAt: {type: "string"},
        currentBalance: {type: "integer"}

    },
    required: ["savingName", "goal", "description", "householdId"],
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
        id: {
            type: "string",
            minLength: 24,
            maxLength: 24
        },
        savingName: {type: "string", minLength: 1},
        goal: {type: "integer"},
        description: {type: "string", minLength: 1},
    },
    required: ["id"],
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

