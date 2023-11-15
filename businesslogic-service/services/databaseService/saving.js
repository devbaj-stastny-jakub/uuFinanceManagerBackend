const axios = require("axios");

const date = new Date();
const local = date.toLocaleString("cs-CZ")
class DatabaseServiceSaving {
    async get(){
        const getSaving = {
            id: "61e1554617f0e248baf15f42",
            savingName: "Save",}
        return getSaving
    }
    async list(){
        const listTags = {
            id: "61e1554617f0e248baf15f42",
            tagName: "Sace",
        }
        return listTags
    }
    async create(data){
        const newSaving = {
            id: "61e1554617f0e248baf15f42",
            goal: data.goal,
            description: data.description,
            savingName: data.savingName,
            createdAt: local,}
        return newSaving
    }
    async update(){
        const updatedSaving = {
            id: "61e1554617f0e248baf15f42",
            savingName: "Transport",
            goal: "1001",
            description: "car",
            updatedAt: local,}
        return updatedSaving
    }

    async delete(){
        const deleteSaving = {
            id: "61e1554617f0e248baf15f42",
            tagName: "Save",}
        return deleteSaving
    }
}

module.exports = new DatabaseServiceSaving()