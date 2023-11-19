const express = require('express')
const householdController = require("../../controllers/household")
const router = express.Router()


router.get("/list", async (_req, _res) => {
    await householdController.list(_req, _res);
});

router.get("/:id", async (_req, _res) => {
    await householdController.get(_req, _res);
});

router.patch("/patch", async (_req, _res) => {
    await householdController.update(_req, _res);
});

router.delete("/:id/delete", async (_req, _res) => {
    await householdController.delete(_req, _res);
});

router.post("/create", async (_req, _res) => {
    await householdController.create(_req, _res);
});

/*router.post('/household/AddMember', async (_req, _res) => {
    await householdController.AddMember(_req, _res);
    _res.status(200).json({ message: 'Member added successfully' });
});*/

module.exports = router;
