

const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    ProfilePic: String,
    Role: String,
    Team: String,
    phoneNum: String,
    Address: String,
    DOB: String,
    MStatus: String,
    Res: String

})

const ProfileModel = mongoose.model("profiledata", ProfileSchema)
module.exports = ProfileModel


