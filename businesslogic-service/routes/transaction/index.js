const express = require('express')
const transactionController = require("../../controllers/transaction")
const router = express.Router()

//? /transaction/list
router.get("/list", async (_req, _res)=>{
    await transactionController.list(_req, _res)
})

//? /transaction/:id
router.get("/:id", async (_req, _res)=>{
    await transactionController.get(_req, _res)
})

//? /transaction/create
router.post("/create", async (_req, _res)=>{
    await transactionController.create(_req, _res)
})

//? /transaction/:id/patch
router.patch("/patch", async (_req, _res)=>{
    await transactionController.update(_req, _res)
})

//? /transaction/:id/delete
router.delete("/:id/delete", async (_req, _res)=>{
    await transactionController.delete(_req, _res)
})

module.exports = router
