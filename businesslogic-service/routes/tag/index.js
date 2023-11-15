const express = require("express");
const tagController = require("../../controllers/tag")
const router = express.Router()

router.get("/:id", async (_req, _res) => {
    await tagController.get(_req, _res);
});
router.get("/list", async (_req, _res) => {
     await tagController.list(_req, _res);
});
router.post("/create", async (_req, _res) => {
    await tagController.create(_req, _res);
});
router.patch("/:id/update", async (_req, _res) => {
  await tagController.patch(_req, _res);

});

router.delete("/:id/delete", async (_req, _res) => {
     await tagController.delete(_req, _res);
});



module.exports = router