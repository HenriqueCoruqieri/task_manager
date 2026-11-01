const { Schema, model } = require("mongoose")

const TaskSchema = Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  opening_date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  expiration_date: {
    type: Date,
    required: true,
  },
}, {timestamps: true}) 

const TaskModel = model("Task", TaskSchema)

module.exports = TaskModel
