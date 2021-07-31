const mongoose = require('mongoose')

const appSchema = mongoose.Schema

const MovieSchema = new appSchema({
    name : String,
    genres : [String],
    image : String,
    premiered : Date

})


module.exports = mongoose.model('movies', MovieSchema)