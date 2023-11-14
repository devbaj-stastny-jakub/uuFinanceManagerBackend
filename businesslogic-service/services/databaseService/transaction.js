const axios = require("axios");

class DatabaseServiceTransaction {
    async list(limit = undefined, parentId = undefined) {
        try {
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/transaction/list",
                params: {
                    limit: limit,
                    parentId: parentId
                },
            })
            return result.data
        } catch (exception) {
            return {errorMessages: [{message: "Nepodařilo se zíkat seznam", exception: exception}]}
        }
    }

    async delete(transactionId) {
        try {
            const result = await axios({
                method: "DELETE",
                url: "http://database-service-container:3002/transaction/" + transactionId + "/delete",
            })
            return result.data
        } catch (exception) {
            return {errorMessages: [{message: "Položku se nepodařilo smazat", exception: exception}]}
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
        } catch (exception) {
            return {errorMessages: [{message: "Položku se nepodařilo upravit", exception: exception}]}
        }
    }

    async get(transactionId) {
        try {
            const result = await axios({
                method: "GET",
                url: "http://database-service-container:3002/transaction/" + transactionId,
            })
            return result.data
        } catch (exception) {
            return {errorMessages: [{message: "Položku se nepodařilo načíst", exception: exception}]}
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
        } catch (exception) {
            return {errorMessages: [{message: "Položku se nepodařilo vytvořit", exception: exception}]}
        }
    }
}

module.exports = new DatabaseServiceTransaction()
