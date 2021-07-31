const mongoose = require('mongoose')

const appSchema = mongoose.Schema


const PremissionSchema = new appSchema({
        
        role:String,
        premissions: [String]

})

module.exports = mongoose.model('premissions', PremissionSchema)