const UserModel = require("../models/user.model")
const mongoose = require("mongoose")

class UserController {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  async getAll() {
    try {
      const user = await UserModel.find({})

      this.res.status(200).send(user)
    } catch (error) {
      console.error(error)
      this.res.status(500).send("Usuário não encontrado")
    }
  }

  async create() {
    try {
      const createUser = new UserModel(this.req.body)

      await createUser.save()

      this.res.status(201).send(createUser)
    } catch (error) {
      console.error(error)
      this.res.status(500).send("Não foi possível criar o usuário")
    }
  }
}

module.exports = UserController
