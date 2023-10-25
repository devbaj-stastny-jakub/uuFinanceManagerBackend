const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Business logic service!')
})

app.listen(port, () => {
    console.log(`Business logic service is listening on port ${port}`)
})
