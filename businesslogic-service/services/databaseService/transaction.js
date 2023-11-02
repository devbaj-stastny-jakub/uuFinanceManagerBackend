const axios = require("axios");

class DatabaseServiceTransaction {
    async list(limit = undefined, parentId = undefined){
        try{
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
            return []
        }
    }
}

module.exports = new DatabaseServiceTransaction()
