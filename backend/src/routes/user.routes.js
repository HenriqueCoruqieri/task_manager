const express = require("express")

const UserController = require("../controllers/user.controller")

const router = express.Router()

router.get("/", async (req, res) => {
  return new UserController(req, res).getAll()
})

router.get("/:id", async (req, res) => {
  return new UserController(req, res).getById()
})

router.post("/", async (req, res) => {
  return new UserController(req, res).create()
})

module.exports = router
