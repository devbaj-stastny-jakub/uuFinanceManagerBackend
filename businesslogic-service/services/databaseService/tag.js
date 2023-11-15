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
        const listTags = {
            id: "61e1554617f0e248baf15f42",
            tagName: "Name",
            }
        return listTags
    }

    async update(name){
        const updateTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: name.tagName,
            updatedAt: local}
        return updateTag
    }
    async get(){
        const getTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: "Name",}
        return getTag
    }
    async delete(){
        const deleteTag = {
            id: "61e1554617f0e248baf15f42",
            tagName: "Name",}
        return deleteTag
    }
}

module.exports = new DatabaseServiceTag()