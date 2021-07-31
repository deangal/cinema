const mongoose = require('mongoose')

const appSchema = mongoose.Schema


const UserSchema = new appSchema({

    firstName: String,
    lastName : String,
    createdDate : Date,
    SessionTimeOut : Number
    
})

module.exports = mongoose.model('users', UserSchema)