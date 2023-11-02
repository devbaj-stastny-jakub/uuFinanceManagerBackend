const express = require('express')
const router = express.Router()
const transactionController = require("../../controllers/transaction")

router.post("/create", async (_req, _res) => {
    const createdTransaction = await transactionController.create(_req, _res)
    _res.json(createdTransaction)
})
router.get("/list", async (_req, _res) => {
    const transactionsList = await transactionController.list(_req, _res)
    _res.json(transactionsList)
})
router.get("/:id", async (_req, _res) => {
    const transaction = await transactionController.get(_req, _res)
    _res.json(transaction)
})
router.patch("/:id/update", async (_req, _res) => {
    const updatedTransaction = await transactionController.patch(_req, _res)
    _res.json(updatedTransaction)
})
router.delete("/:id/delete", async (_req, _res) => {
    const deletedTransaction = await transactionController.delete(_req, _res)
    _res.json(deletedTransaction)
})
module.exports = router
