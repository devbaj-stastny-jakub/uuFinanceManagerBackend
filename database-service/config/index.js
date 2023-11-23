const config = {
    database: {
        uri: "mongodb://mongodb-container:27017/mydb",
        name: "mydb",
        collection: {
            transactions: "transactions",
            households: "households"
        }
    }
}

module.exports = config
