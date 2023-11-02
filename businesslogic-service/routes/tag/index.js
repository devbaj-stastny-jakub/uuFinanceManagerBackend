const express = require("express");
const router = express.Router()

router.get("/tag/list", async (_req, _res) => {
    const tagsList = await tagsController.list(_req, _res);
    _res.send(tagsList);
});
router.post("/tag/post", (_req, _res) => {
    _res.json({ message: "working!" });
});
router.patch("/tag/:id/patch", (_req, _res) => {
    _res.json({ message: "working!" });
});

router.delete("/tag/:id/delete", (_req, _res) => {
    _res.json({ message: "working!" });
});




module.exports = router