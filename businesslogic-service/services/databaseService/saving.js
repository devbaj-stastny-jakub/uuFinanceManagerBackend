const axios = require("axios");

const date = new Date();
const local = date.toLocaleString("cs-CZ")
class DatabaseServiceSaving {

    async create(data){
        const newSaving = {
            id: "61e1554617f0e248baf15f42",
            goal: 1000,
            description: "",
            savingName: data.savingName,
            createdAt: local,}
        return newSaving
    }

}

module.exports = new DatabaseServiceSaving()