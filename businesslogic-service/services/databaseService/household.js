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
    async update(data){
        const mockUpdateData = {
            id: "123456789012345678901234",
            name: data.name,
        }
        return mockUpdateData;
    }
    async delete(data){
        return {};
    }
    async get(data){
        const mockGetData = {
            id: "123456789012345678901234",
            name: data.name,
        }
        return mockGetData;
    }
}

module.exports = new DatabaseServiceHousehold()