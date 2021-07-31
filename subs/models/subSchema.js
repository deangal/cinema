const mongoose = require('mongoose')

const appSchema = mongoose.Schema

const SubSchema = new appSchema({
   memberId : String,
   movies : [{
           
            movieId:String,
            date:Date
            },{_id:false}]

})


module.exports = mongoose.model('subs', SubSchema)