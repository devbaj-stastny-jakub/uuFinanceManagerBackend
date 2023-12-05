const express = require("express");
const tagController = require("../../controllers/tag")
const router = express.Router()

router.get("/list", async (_req, _res, next) => {
    await tagController.list(_req, _res, next);
});

router.get("/:id", async (_req, _res, next) => {
    await tagController.get(_req, _res, next);
});

router.post("/create", async (_req, _res, next) => {
    await tagController.create(_req, _res, next);
});

router.patch("/update", async (_req, _res, next) => {
  await tagController.update(_req, _res, next);
});

router.delete("/delete", async (_req, _res, next) => {
     await tagController.delete(_req, _res, next);
});



module.exports = router
