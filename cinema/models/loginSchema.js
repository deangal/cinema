const mongoose = require('mongoose')

const appSchema = mongoose.Schema


const LoginSchema = new appSchema({
    
    userId:String,      //GIVEN BY ADMIN
    username : String,  //GIVEN BY ADMIN
    password : String,
    role: String
    

    
})

module.exports = mongoose.model('logins', LoginSchema)