const express = require('express')
const cors = require('cors')
const transactionRouter = require("./routes/transaction")
const householdRouter = require("./routes/household")
const tagRouter = require("./routes/tag")
const savingRouter = require("./routes/saving")
const {handleError} = require("./middlewares")

const app = express()
app.use(cors())
const port = 3001

const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'http://uushoppinglist.com',
    issuerBaseURL: `https://dev-ducb3de5dqthsoxl.us.auth0.com/`,
});

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Business logic service!')
})

app.use(checkJwt)
app.use("/household", householdRouter)
app.use("/transaction", transactionRouter)
app.use("/tag", tagRouter)
app.use("/saving", savingRouter)


app.use(handleError)

app.listen(port, () => {
    console.log(`Business logic service is listening on port ${port}`)
})
