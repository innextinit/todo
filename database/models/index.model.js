const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z]{2,15}$/i.test(value)
            },
            message: problem => `${problem.value} is not a valid name`
        }
    },
    lastName: {
        type: String,
        trim: true,
        require: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z-]{2,15}$/.test(value)
            },
            message: problem => `${problem.value} is not a valid name`
        }
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^([\w-.]{3,})+@([\w-.]{3,15})+.([a-zA-Z]{2,3})$/.test(value)
            },
            message: problem => `${problem.value} is not valid`
        }
    },
    password: {
        type: String,
        minlength: 12,
        bcrypt: true,
        require: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^([(\w)?+(\W)?]{8,})$/g.test(value)
            },
            message: problem => `${problem.value} is not a valid password`
        }
    }
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);