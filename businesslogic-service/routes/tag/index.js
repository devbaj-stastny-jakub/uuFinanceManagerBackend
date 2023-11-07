const express = require("express");
const router = express.Router()

router.get("/:id", async (_req, _res) => {
    const tag = await tagController.get(_req, _res);
    _res.json(tag);
});
router.get("/list", async (_req, _res) => {
    const tagsList = await tagController.list(_req, _res);
    _res.json(tagsList);
});
router.post("/create", async (_req, _res) => {
    const createdTag = await tagController.create(_req, _res);
    _res.json(createdTag);
});
router.patch("/:id/update", async (_req, _res) => {
    const updatedTag = await tagController.patch(_req, _res);
    _res.json(updatedTag);
});

router.delete("/:id/delete", async (_req, _res) => {
    const deletedTag = await tagController.delete(_req, _res);
    _res.json(deletedTag);
});



module.exports = router