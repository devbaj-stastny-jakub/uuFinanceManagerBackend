const express = require('express')
const householdController = require("../../controllers/household")
const router = express.Router()
const { createModel, updateModel, listModel, deleteModel } = require("../../models/household")


// Ještě napojit routy na správné controllery
router.get("/list", async (_req, _res)=>{
    await householdController.list(_req, _res)
    _res.json(householdList)
});

router.get("/:id", async (_req, _res)=>{
    await householdController.get(_req, _res)
    _res.json(householdID)
});

router.patch("/:id/patch", async (_req, _res)=>{
    await householdController.patch(_req, _res)
    _res.json({message: "working!"})
});

router.delete("/:id/delete", async (_req, _res)=>{
    await householdController.delete(_req, _res)
    _res.json({message: "working!"})
});

router.post("/create", async (_req, _res)=>{
    await householdController.create(_req, _res)
    _res.json({message: "working!"})
});

router.post("/AddMember", async (_req, _res)=>{
    await householdController.AddMember(_req, _res)
    _res.json({message: "working!"})
});

module.exports = router
