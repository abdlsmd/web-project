
const mongoose = require('mongoose')


const GallerySchema =  new mongoose.Schema({
    image: String

})

const GalleryModel = mongoose.model("Gallery", GallerySchema)
module.exports = GalleryModel