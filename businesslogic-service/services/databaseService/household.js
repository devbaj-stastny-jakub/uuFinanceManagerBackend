const axios = require('axios');

class DatabaseServiceHousehold {
    async list(userId){
        try{
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/household/list",
                params: {
                    userId: userId
                }
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
                url: "http://database-service-container:3002/household/create",
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
                url: "http://database-service-container:3002/household/" + householdId + "/patch",
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
                url: "http://database-service-container:3002/household/" + householdId + "/delete",
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
                url: "http://database-service-container:3002/household/" + householdId,
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
