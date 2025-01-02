
const mongoose = require('mongoose')


const EventRegSchema =  new mongoose.Schema({
    fname: String,
    lname: String,
    batch: String,
    degree: String,
    Rollnum: String,
})

const EventRegModel = mongoose.model("EventReg", EventRegSchema)
module.exports = EventRegModel