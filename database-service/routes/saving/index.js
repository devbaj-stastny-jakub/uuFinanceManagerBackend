const express = require('express')
const router = express.Router()
const savingController = require("../../controllers/saving")

router.post("/create", async (_req, _res) => {
    await savingController.create(_req, _res)
})
router.get("/list", async (_req, _res) => {
    await savingController.list(_req, _res)
})
router.get("/:id", async (_req, _res) => {
    await savingController.get(_req, _res)
})
router.patch("/:id/update", async (_req, _res) => {
    await savingController.patch(_req, _res)
})
router.delete("/:id/delete", async (_req, _res) => {
    await savingController.delete(_req, _res)
})
module.exports = router
