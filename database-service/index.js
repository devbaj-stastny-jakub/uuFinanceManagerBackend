const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res) => {
    res.send('Database service!')
})

app.listen(port, () => {
    console.log(`Database service is listening on port ${port}`)
})
