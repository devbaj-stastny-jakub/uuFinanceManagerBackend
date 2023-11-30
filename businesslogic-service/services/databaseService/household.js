const axios = require('axios');

class DatabaseServiceHousehold {
    async list(limit = undefined, data){
        const mockListData = [
            {
                id: "123456789012345678901234",
                name: "Household 1",
                balance: "0",
                ownerID: "55y1554617f0e248bam1hj50",
                membersIDs: ["66y1554617f0e248bam1uy60","88y1554617f0e248bam1lp80"],
            },
            {
                id: "123456789012345678901235",
                name: "Household 2",
                balance: "14563",
                ownerID: "55y1554617f0e248bam1hj50",
                membersIDs: ["66y1554617f0e248bam1uy60","88y1554617f0e248bam1lp80"],
            },
            {
                id: "123456789012345678901236",
                name: "Household 3",
                balance: "14563",
                ownerID: "55y1554617f0e248bam1hj50",
                membersIDs: ["66y1554617f0e248bam1uy60","88y1554617f0e248bam1lp80"],
            },
        ];
        return mockListData;
    }
    async create(data){
        const mockCreateData = {
            id: "123456789012345678901234",
            name: data.name,
            balance: 0,
            ownerID: "55y1554617f0e248bam1hj50",
            membersIDs: [],
        }
        return mockCreateData;
    }
    async update(data){
        const mockUpdateData = {
            id: "123456789012345678901234",
            name: data.name ? data.name : "Household 1",
            balance: data.balance ? data.balance : 0,
            ownerID: data.ownerID ? data.ownerID : "55y1554617f0e248bam1hj50",
            membersIDs: data.membersIDs ? data.membersIDs : ["66y1554617f0e248bam1uy60","88y1554617f0e248bam1lp80"],
        }
        return mockUpdateData;
    }
    async delete(data){
        return null;
    }
    async get(data){
        const mockGetData = {
            id: "123456789012345678901234",
            name: data.name ? data.name : "Household 1",
            balance: 0,
            ownerID: "55y1554617f0e248bam1hj50",
            membersIDs: ["66y1554617f0e248bam1uy60","88y1554617f0e248bam1lp80"],
        }
        return mockGetData;
    }
}

module.exports = new DatabaseServiceHousehold()
