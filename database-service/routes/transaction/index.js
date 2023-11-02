const express = require('express')
const router = express.Router()
const transactionController = require("../../controllers/transaction")

router.post("/create", async (_req, _res) => {
    await transactionController.create(_req, _res)
})
router.get("/list", async (_req, _res) => {
    await transactionController.list(_req, _res)
})
router.get("/:id", async (_req, _res) => {
   await transactionController.get(_req, _res)
})
router.patch("/:id/update", async (_req, _res) => {
    await transactionController.patch(_req, _res)
})
router.delete("/:id/delete", async (_req, _res) => {
    await transactionController.delete(_req, _res)
})
module.exports = router
