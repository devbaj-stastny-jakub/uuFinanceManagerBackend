const axios = require("axios");
import {config} from "../../config";

class DatabaseServiceTag {
    async list(tagID) {
        try {
            const result = await axios({
                method: "GET",
                url: config.databaseServiceUrl + "/tag/list",
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
                url: config.databaseServiceUrl + "/tag/" + tagId + "/delete",
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
                url: config.databaseServiceUrl + "/tag/" + tagId + "/update",
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
                url: config.databaseServiceUrl + "/tag/" + tagId,
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
                url: config.databaseServiceUrl + "/tag/create",
                data: {...data, authorId}
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }
}

module.exports = new DatabaseServiceTag()
