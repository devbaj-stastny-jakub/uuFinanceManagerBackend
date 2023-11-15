const axios = require("axios");

const date = new Date();
const local = date.toLocaleString("cs-CZ")
class DatabaseServiceTag {

    async create(data){
        const newTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: data.tagName,
            createdAt: local,}
        return newTag
    }
    async list(){
        const list{
            id: "61e1554617f0e248baf15f42",
                tagName: data.tagName,
                createdAt: local,
        }
        return list
    }
}

module.exports = new DatabaseServiceTag()