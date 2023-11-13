const express = require('express')
const householdController = require("../../controllers/household")
const router = express.Router()


router.get("list", async (_req, _res) => {
    const householdList = await householdController.list(_req, _res);
    _res.status(200).json({ data: householdList });
});

router.get("/:id", async (_req, _res) => {
    const householdId = await householdController.get(_req, _res);
    _res.status(200).json({ data: householdId });
});

router.patch("/:id", async (_req, _res) => {
    const householdId = await householdController.patch(_req, _res);
    _res.status(200).json({ data: householdId });
});

router.delete("/:id", async (_req, _res) => {
    const householdID = await householdController.delete(_req, _res);
    _res.status(200).json({ data: householdID });
});

router.post("/household", async (_req, _res) => {
    await householdController.create(_req, _res);
    _res.status(201).json({ message: 'Household created successfully' });
});

router.post('/household/AddMember', async (_req, _res) => {
    await householdController.AddMember(_req, _res);
    _res.status(200).json({ message: 'Member added successfully' });
});

module.exports = router;
