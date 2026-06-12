const bcrypt = require("bcryptjs")
const { SignJWT } = require("jose")

const UserModel = require("../models/user.model")
const mongoose = require("mongoose")

const {
  notFoundError,
  objectIdCastError,
  passwordError,
} = require("../errors/mongodb.errors")
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

      const allowedUpdates = ["password, image_url"]
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

  async login() {
    try {
      const { email, password } = this.req.body

      const user = await UserModel.findOne({ email })

      if (!user) {
        return notFoundError(this.res)
      }

      const passwordIsValid = await bcrypt.compare(password, user.password)

      if (!passwordIsValid) {
        passwordError()
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET)

      const token = await new SignJWT({ id: user._id.toString() })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secret)

      return this.res.status(200).json({
        token,
        username: `${user.first_name}${user.last_name}`,
        id: user._id,
      })
    } catch (error) {
      console.error(error)
      this.res.status(500).send(error.message)
    }
  }
}

module.exports = UserController
