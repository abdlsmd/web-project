

const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
     name: String,
     email: String,
     role: String,
     password: String
})

const RegisterModel = mongoose.model("register", RegisterSchema)
module.exports = RegisterModel;
