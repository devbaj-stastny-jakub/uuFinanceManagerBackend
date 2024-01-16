const express = require('express')
const router = express.Router()
const householdController = require("../../controllers/household")

router.post("/create", async (_req, _res) => {
    await householdController.create(_req, _res)
}) 
router.get("/list", async (_req, _res) => {
    await householdController.list(_req, _res)
})
router.get("/statistics", async (_req, _res) => {
    await householdController.statistics(_req, _res)
})
router.get("/:id", async (_req, _res) => {
    await householdController.get(_req, _res)
})
router.patch("/:id/patch", async (_req, _res) => {
    await householdController.patch(_req, _res)
})
router.delete("/:id/delete", async (_req, _res) => {
    await householdController.delete(_req, _res)
})
module.exports = router