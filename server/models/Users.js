const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    status: String,
    team: String,
    role: String,
    hiringStatus: String
})

const UserModel = mongoose.model("users" , UserSchema)
module.exports = UserModel