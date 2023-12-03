const express = require('express')
const householdController = require("../../controllers/household")
const router = express.Router()


router.get("/list", async (_req, _res, next) => {
    await householdController.list(_req, _res, next);
});

router.get("/:id", async (_req, _res, next) => {
    await householdController.get(_req, _res, next);
});

router.patch("/patch", async (_req, _res, next) => {
    await householdController.update(_req, _res, next);
});

router.delete("/:id/delete", async (_req, _res, next) => {
    await householdController.delete(_req, _res, next);
});

router.post("/create", async (_req, _res, next) => {
    await householdController.create(_req, _res, next);
});

/*router.post('/household/AddMember', async (_req, _res) => {
    await householdController.AddMember(_req, _res);
    _res.status(200).json({ message: 'Member added successfully' });
});*/

module.exports = router;
