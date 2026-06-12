const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  image_url: {
    type: String,
    default: "default_profile.png",
  },
})

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return

  this.password = await bcrypt.hash(this.password, 10)
})

const UserModel = model("User", UserSchema)

module.exports = UserModel
