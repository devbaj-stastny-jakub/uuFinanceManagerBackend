const express = require("express");
const router = express.Router()

router.get("/:id", async (_req, _res) => {
    const saving = await savingController.get(_req, _res);
    _res.json(saving);
});
router.get("/list", async (_req, _res) => {
    const savingList = await savingController.list(_req, _res);
    _res.json(savingList);
});
router.post("/create", async (_req, _res) => {
    const createdSaving = await savingController.create(_req, _res);
    _res.json(createdSaving);
});
router.patch("/:id/update", async (_req, _res) => {
    const updatedSaving = await savingController.patch(_req, _res);
    _res.json(updatedSaving);
});

router.delete("/:id/delete", async (_req, _res) => {
    const deletedSaving = await savingController.delete(_req, _res);
    _res.json(deletedSaving);
});



module.exports = router