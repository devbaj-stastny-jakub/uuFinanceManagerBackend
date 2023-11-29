const axios = require("axios");

class DatabaseServiceTag {
    async list(tagID) {
        try {
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/tag/list",
                params: {
                    transactionID:tagID
                },
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async delete(tagId) {
        try {
            const result = await axios({
                method: "DELETE",
                url: "http://database-service-container:3002/tag/" + tagId + "/delete",
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async update(tagId, data) {
        try {
            const result = await axios({
                method: "PATCH",
                url: "http://database-service-container:3002/tag/" + tagId + "/update",
                data: data
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async get(tagId) {
        try {
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/tag/" + tagId,
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }

    async create(data, authorId) {
        try {
            const result = await axios({
                method: "POST",
                url: "http://database-service-container:3002/tag/create",
                data: {...data, authorId}
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }
}

module.exports = new DatabaseServiceTag()
