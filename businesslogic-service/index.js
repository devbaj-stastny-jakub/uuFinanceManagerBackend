const express = require('express')
const transactionRouter = require("./routes/transaction")
const {handleError} = require("./middlewares")

const app = express()
const port = 3001

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Business logic service!')
})

app.use("/transaction", transactionRouter)


app.use(handleError)

app.listen(port, () => {
    console.log(`Business logic service is listening on port ${port}`)
})
