const config = {
    database: {
        uri: "mongodb://mongodb-container:27017/mydb",
        name: "mydb",
        collection: {
            transactions: "transactions",
            households: "households",
            tag: "tag",
            saving: "saving"

        }
    }
}

module.exports = config
