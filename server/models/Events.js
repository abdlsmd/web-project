
const mongoose = require('mongoose')


const EventSchema =  new mongoose.Schema({
    name: String,
    description: String,
    organizer: String,
    date: String,
    endDate: String,
    time: String,
    address: String,
    venue: String,
    budget: String,
    status: String,
    image: String,
    ApprovalStatus: Boolean

})

const EventModel = mongoose.model("events", EventSchema)
module.exports = EventModel