const { MongoClient } = require('mongodb');
const config = require("./config")

const uri = config.database.uri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

async function closeMongoDBConnection() {
    await client.close();
    console.log('MongoDB connection closed');
}

module.exports = { connectToMongoDB, closeMongoDBConnection, client };
