const axios = require("axios");

const date = new Date();
const timestamp = date.getTime()
class DatabaseServiceSaving {
    async get(){
        const getSaving = {
            id: "61e1554617f0e248baf15f42",
            name: "Save",
            createdAt: timestamp}
        return getSaving
    }
    async list(){
        const listSaving = [
            {id: "61e1554617f0e248baf15f42",
                name:"Save1",
                createdAt:1700141782974},
            { id: "61e1554617f0e248baf15f43",
            name:"Save2",
                createdAt:1700141782974},
            { id: "61e1554617f0e248baf15f44",
                name:"Save3",
                createdAt:1700141782974},
        ]
        return listSaving
    }
    async create(data){
        const newSaving = {
            id: "61e1554617f0e248baf15f42",
            goal: data.goal,
            description: data.description,
            savingName: data.savingName,
            createdAt: timestamp,
            currentBalance: 0,}

        return newSaving
    }
    async update(data){
        const updatedSaving = {
            id: "61e1554617f0e248baf15f42",
            savingName: data.savingName,
            goal: data.goal,
            description: data.description,
            createdAt: 1700141782974,
            updatedAt: timestamp,
            currentBalance: 0,
        }
        return updatedSaving
    }

    async delete(){

        return null
    }
}

module.exports = new DatabaseServiceSaving()