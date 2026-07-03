const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true,"username already taken"],
        required: true,
    },
    email :{
        type: String,
        required:true,
        unique:[true,"email already taken"]
    },
    password :{
        type: String,
        required:[true, "password is required"]
    }
})


const userModel = mongoose.model("users", userSchema)

module.exports = userModel