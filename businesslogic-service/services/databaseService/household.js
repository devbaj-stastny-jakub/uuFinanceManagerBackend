const axios = require('axios');
const config = require("../../config");

class DatabaseServiceHousehold {
    async list(userId){
        try{
            const result = await axios({
                method: "GET",
                url: config.databaseServiceUrl + "/household/list",
                params: {
                    userId: userId
                }
            })
            return result.data;
        } catch (e) {
            return e.response.data;
        }
    }
    async statistics(params) {
        try{
            const result = await axios({
                method: "GET",
                url: config.databaseServiceUrl + "/household/statistics",
                params
            })
            return result.data;
        } catch (e) {
            return e.response.data;
        }
    }
    async create(data, creatorId){
        try {
            const result = await axios({
                method: "POST",
                url: config.databaseServiceUrl + "/household/create",
                data: {...data, ownerId: creatorId}
            })
            return result.data;
        }
        catch (e) {
            return e.response.data;
        }
    }
    async update(data, householdId){
        try {
            const result = await axios({
                method: "PATCH",
                url: config.databaseServiceUrl + "/household/" + householdId + "/patch",
                data: data
            })
            console.log("bruhj")
            return result.data;
        }
        catch (e) {
            return e.response.data;
        }
    }

    async delete(householdId){
        try {
            const result = await axios({
                method: "DELETE",
                url: config.databaseServiceUrl + "/household/" + householdId + "/delete",
            })
            return result.data;
        }
        catch (e) {
            return e.response.data;
        }
    }
    async get(householdId){
        try {
            const result = await axios({
                method: "GET",
                url: config.databaseServiceUrl + "/household/" + householdId,
            })
            console.log(result.data)
            return result.data;
        }
        catch (e) {
            return e.response.data;
        }
    }
}

module.exports = new DatabaseServiceHousehold()
