const express = require('express')
const transactionController = require("../../controllers/transaction")
const router = express.Router()

const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'http://localhost:300',
    issuerBaseURL: `https://dev-ducb3de5dqthsoxl.us.auth0.com/`,
});

//? /transaction/list
router.get("/list", checkJwt, async (_req, _res, next)=>{
    await transactionController.list(_req, _res, next)
})

//? /transaction/:id
router.get("/:id", checkJwt, async (_req, _res, next)=>{
    await transactionController.get(_req, _res, next)
})

//? /transaction/create
router.post("/create", checkJwt, async (_req, _res, next)=>{
    await transactionController.create(_req, _res, next)
})

//? /transaction/:id/patch
router.patch("/patch", checkJwt, async (_req, _res, next)=>{
    await transactionController.update(_req, _res, next)
})

//? /transaction/:id/delete
router.delete("/:id/delete", checkJwt, async (_req, _res, next)=>{
    await transactionController.delete(_req, _res, next)
})

module.exports = router
