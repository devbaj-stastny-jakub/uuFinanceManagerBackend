const axios = require("axios");

const date = new Date();
const timestamp = date.getTime()
class DatabaseServiceSaving {
    async get(data) {
        try {
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/saving/" + data.id,
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async list(parentId, userId) {
        try {
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/saving/list",
                params: {
                    householdId: parentId,
                    userId: userId
                },
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }
    async create(data) {
        try {
            const result = await axios({
                method: "POST",
                url: "http://database-service-container:3002/saving/create",
                data: data
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async update(data) {
        try {
            const result = await axios({
                method: "PATCH",
                url: "http://database-service-container:3002/saving/" + data.id + "/update",
                data: {...data, id: undefined}
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async delete(id) {
        try {
            const result = await axios({
                method: "DELETE",
                url: "http://database-service-container:3002/saving/" + id + "/delete",
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }
}

module.exports = new DatabaseServiceSaving()
