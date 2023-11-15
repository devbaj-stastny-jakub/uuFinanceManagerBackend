const axios = require("axios");

class DatabaseServiceTag {
    async create(data){
        const newTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: data.tagName,
            createdAt: Date.now(),
            updatedAt: 1697542053,}
        return newTag
    }
}

module.exports = new DatabaseServiceTag()