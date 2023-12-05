const axios = require("axios");

class DatabaseServiceTransaction {
    async list(limit = undefined, parentId = undefined, userId) {
        try {
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/transaction/list",
                params: {
                    limit: limit,
                    parentId: parentId,
                    userId: userId
                },
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async delete(transactionId) {
        try {
            const result = await axios({
                method: "DELETE",
                url: "http://database-service-container:3002/transaction/" + transactionId + "/delete",
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async update(transactionId, data) {
        try {
            const result = await axios({
                method: "PATCH",
                url: "http://database-service-container:3002/transaction/" + transactionId + "/update",
                data: data
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async get(transactionId) {
        try {
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/transaction/" + transactionId,
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async create(data, creatorId) {
        try {
            const result = await axios({
                method: "POST",
                url: "http://database-service-container:3002/transaction/create",
                data: {...data, creatorId}
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }
}

module.exports = new DatabaseServiceTransaction()
