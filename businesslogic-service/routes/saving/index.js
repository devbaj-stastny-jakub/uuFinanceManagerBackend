const express = require("express");
const savingController = require("../../controllers/saving")
const router = express.Router()

router.get("/list", async (_req, _res, next) => {
    await savingController.list(_req, _res, next);
});
router.get("/:id", async (_req, _res, next) => {
   await savingController.get(_req, _res, next);
});
router.post("/create", async (_req, _res, next) => {
    await savingController.create(_req, _res, next);

});
router.patch("/patch", async (_req, _res, next) => {
    await savingController.update(_req, _res, next);
});

router.delete("/:id/delete", async (_req, _res, next) => {
   await savingController.delete(_req, _res, next);

});



module.exports = router
