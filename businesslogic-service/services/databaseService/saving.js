const axios = require("axios");

const date = new Date();
const local = date.toLocaleString("cs-CZ")
class DatabaseServiceSaving {

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
            goal: "",
            description: "",
            savingName: "",
            createdAt: local,}
        return updatedSaving
    }
}

module.exports = new DatabaseServiceSaving()