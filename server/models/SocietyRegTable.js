

const mongoose = require('mongoose')


const SocietyRegSchema =  new mongoose.Schema({
    fname: String,
    lname: String,
    batch: String,
    degree: String,
    Rollnum: String,
    Contact: String,
    Team: String,
    Role: String,
    PastExp: String,
    CVimage: String,
    SelectionStatus: Boolean
})

const SocietyRegModel = mongoose.model("SocietyRegTable", SocietyRegSchema)
module.exports = SocietyRegModel