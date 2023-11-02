const express = require('express')
const transactionRouter = require("./routes/transaction")
const {connectToMongoDB, closeMongoDBConnection} = require("./mongodb-connection")
const app = express()
const port = 3002

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));

connectToMongoDB()

app.get('/', (req, res) => {
    res.send('Database service!')
})

app.use("/transaction", transactionRouter)

app.listen(port, () => {
    console.log(`Database service is listening on port ${port}`)
})

process.on('SIGINT', () => {
    closeMongoDBConnection().then(() => {
        process.exit(0);
    });
});