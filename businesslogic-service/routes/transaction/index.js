const express = require('express')
const transactionController = require("../../controllers/transaction")
const router = express.Router()

//? /transaction/list
router.get("/list", async (_req, _res, next)=>{
    await transactionController.list(_req, _res, next)
})

//? /transaction/analyze
router.get("/analyze", async (_req, _res, next)=>{
    await transactionController.analyze(_req, _res, next)
})

//? /transaction/:id
router.get("/:id", async (_req, _res, next)=>{
    await transactionController.get(_req, _res, next)
})

//? /transaction/create
router.post("/create", async (_req, _res, next)=>{
    await transactionController.create(_req, _res, next)
})

//? /transaction/:id/patch
router.patch("/patch", async (_req, _res, next)=>{
    await transactionController.update(_req, _res, next)
})

//? /transaction/:id/delete
router.delete("/:id/delete", async (_req, _res, next)=>{
    await transactionController.delete(_req, _res, next)
})

module.exports = router
