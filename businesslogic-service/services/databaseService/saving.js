const axios = require("axios");
import {config} from "../../config";

class DatabaseServiceSaving {
    async get(data) {
        try {
            const result = await axios({
                method: "GET",
                url: config.databaseServiceUrl + "/saving/" + data.id,
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
                url: config.databaseServiceUrl + "/saving/list",
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
                url: config.databaseServiceUrl + "/saving/create",
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
                url: config.databaseServiceUrl + "/saving/" + data.id + "/update",
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
                url: config.databaseServiceUrl + "/saving/" + id + "/delete",
            })
            return result.data
        } catch (e) {
            return e.response.data
        }
    }
}

module.exports = new DatabaseServiceSaving()
