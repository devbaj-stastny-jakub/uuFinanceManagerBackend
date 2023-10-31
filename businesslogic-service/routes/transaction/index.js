const express = require('express')
const transactionController = require("../../controllers/transaction")
const router = express.Router()

//? /transaction/list
router.get("/list", (_req, _res)=>{
    const transactionsList = transactionController.list()
    _res.json(transactionsList)
})

//? /transaction/:id
router.get("/:id", (_req, _res)=>{
    _res.json({message: "working!"})
})

//? /transaction/:id/patch
router.patch("/:id/patch", (_req, _res)=>{
    _res.json({message: "working!"})
})

//? /transaction/:id/delete
router.get("/:id/delete", (_req, _res)=>{
    _res.json({message: "working!"})
})

module.exports = router
