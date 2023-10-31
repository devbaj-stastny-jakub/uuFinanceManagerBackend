const express = require('express')
const transactionRouter = require("./routes/transaction")

const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Business logic service!')
})

app.use("/transaction", transactionRouter)

app.listen(port, () => {
    console.log(`Business logic service is listening on port ${port}`)
})
