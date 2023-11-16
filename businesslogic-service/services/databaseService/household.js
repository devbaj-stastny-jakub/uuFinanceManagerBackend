const axios = require('axios');

class DatabaseServiceHousehold {
    async list(limit = undefined){
        const mockListData = [
            {
                id: "123456789012345678901234",
                name: "Household 1",
            },
        ];
        return mockListData;
    }
    async create(data){
        const mockCreateData = {
            id: "123456789012345678901234",
            name: data.name,
        }
        return mockCreateData;
    }
}

module.exports = new DatabaseServiceHousehold()