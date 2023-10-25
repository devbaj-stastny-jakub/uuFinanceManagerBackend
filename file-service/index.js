const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
    res.send('File service!')
})

app.listen(port, () => {
    console.log(`File service is listening on port ${port}`)
})
