const axios = require("axios");
const config = require("../../config");

class DatabaseServiceTransaction {
    async list(params) {
        try {
            const result = await axios({
                method: "GET",
                url: config.databaseServiceUrl + "/transaction/list",
                params: params
            })
            console.log(result.request)
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async delete(transactionId) {
        try {
            const result = await axios({
                method: "DELETE",
                url: config.databaseServiceUrl + "/transaction/" + transactionId + "/delete",
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
                url: config.databaseServiceUrl + "/transaction/" + transactionId + "/update",
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
                url: config.databaseServiceUrl + "/transaction/" + transactionId,
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
                url: config.databaseServiceUrl + "/transaction/create",
                data: {...data, creatorId}
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }
}

module.exports = new DatabaseServiceTransaction()
