const mongoose = require("mongoose")
const Schema = mongoose.Schema

// this is so a task can have its ID
const task = new Schema({
    taskName: String,
    isCompleted: {
      type: Boolean,
      default: false
    }
  })

const TodoSchema = new Schema({
    todoName: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z '".,!]{3,40}$/i.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    tasks: [task],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
            validator: (value) => {
                return /^[a-f\d]{24}$/i.test(value)
            },
            message: problem => `${problem.value} is not a valid ObjectId`
        }
    }
})

module.exports = mongoose.model("Todo", TodoSchema);