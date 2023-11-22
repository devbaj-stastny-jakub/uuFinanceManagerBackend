const express = require('express')
const router = express.Router()
const tagController = require("../../controllers/tag")

router.post("/create", async (_req, _res) => {
    await tagController.create(_req, _res)
})
module.exports = router
