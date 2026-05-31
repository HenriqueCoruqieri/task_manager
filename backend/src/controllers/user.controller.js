const UserModel = require("../models/user.model")
const mongoose = require("mongoose")

const { notFoundError, objectIdCastError } = require("../errors/mongodb.errors")
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors")

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
      this.res.status(500).send(error.message)
    }
  }

  async getById() {
    try {
      const userId = this.req.params.id

      const user = await UserModel.findById(userId)

      if (!user) {
        return notFoundError(this.res)
      }

      return this.res.status(200).send(user)
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(this.res)
      }

      console.error(error)
      this.res.staus(500).send(error.message)
    }
  }

  async create() {
    try {
      const createUser = new UserModel(this.req.body)

      await createUser.save()

      this.res.status(201).send(createUser)
    } catch (error) {
      console.error(error)
      this.res.status(500).send(error.message)
    }
  }

  async update() {
    try {
      const userId = this.req.params.id
      const userData = this.req.body

      const userToUpdate = await UserModel.findById(userId)

      if (!userToUpdate) {
        return notFoundError(this.res)
      }

      const allowedUpdates = ["password"]
      const requestedUpdates = Object.keys(userData)

      for (const update of requestedUpdates) {
        if (allowedUpdates.includes(update)) {
          userToUpdate[update] = userData[update]
        } else {
          return notAllowedFieldsToUpdateError(this.res)
        }
      }

      await userToUpdate.save()

      return this.res.status(200).send(userToUpdate)
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(this.res)
      }

      this.res.status(500).send(error.message)
    }
  }

  async delete() {
    const userId = this.req.params.id

    const userToDelete = await UserModel.findById(userId)

    if (!userToDelete) {
      return notFoundError(this.res)
    }

    const deletedUser = await UserModel.findByIdAndDelete(userId)

    this.res.status(200).send(deletedUser)
  }
  catch(error) {
    if (error instanceof mongoose.Error.CastError) {
      return objectIdCastError(this.res)
    }
    this.res.status(500).send(error.message)
  }
}

module.exports = UserController
