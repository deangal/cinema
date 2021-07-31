let Utils = require('./utils/Utils') 

let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let movieController = require('./controller/movieController')
let memberController = require('./controller/memberController')
let subController = require('./controller/subController')

let app = express()



require("./config/database")

app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())
app.use('/movies',movieController)
app.use('/members',memberController)
app.use('/subs',subController)


Utils.getMoviesAndSaveInDB()
Utils.getMembersAndSaveInDB()
Utils.getSubsAndSaveInDB()

app.listen(8000,()=>{
    console.log("The server is up");
})