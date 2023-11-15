const axios = require('axios');

class DatabaseServiceHousehold {
    async list(limit = undefined, parentId = undefined){
        const mockListData = [
            {
                id: "123456789012345678901234",
                name: "Household Name",
                ownerID: "someOwnerID",
                membersIDs: ["memberID1", "memberID2"],
                balance: 100.50
            },
        ];
        return mockListData;
    }
}

module.exports = new DatabaseServiceHousehold()