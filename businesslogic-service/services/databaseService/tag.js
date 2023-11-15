const axios = require("axios");

const date = new Date();
const local = date.toLocaleString("cs-CZ")
class DatabaseServiceTag {

    async list(){
        const listTags = {
            id: "61e1554617f0e248baf15f42",
            tagName: "H",
            }
        return listTags
    }
    async create(data){
        const newTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: data.tagName,
            createdAt: local,}
        return newTag
    }
    async update(data){
        const updateTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: data.tagName,
            createdAt: local,}
        return updateTag
    }
}

module.exports = new DatabaseServiceTag()