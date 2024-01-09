const config = {
    database: {
        uri: "mongodb+srv://administrator:1234@uufinancemanager.qam5yl6.mongodb.net/db?retryWrites=true&w=majority",
        name: "db",
        collection: {
            transactions: "transactions",
            households: "households",
            tag: "tag",
            saving: "saving"

        }
    }
}

module.exports = config
