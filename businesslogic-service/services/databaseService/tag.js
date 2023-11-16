const axios = require("axios");

const date = new Date();
const timestamp = date.getTime()
class DatabaseServiceTag {
    async create(data) {
        const newTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: data.tagName,
            createdAt: timestamp,
        }
        return newTag
    }
    async update(name){
        const updateTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: name.tagName,
            createdAt:1700141782974,
            updatedAt: timestamp}
        return updateTag
    }
    async get(){
        const getTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: "Name",}
        return getTag
    }
    async delete(){
        return null
    }
}

module.exports = new DatabaseServiceTag()