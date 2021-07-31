
let Utils = require('./utils/Utils') 
let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let premissonController = require('./controller/premissonController')
let userController = require('./controller/userController')
let loginController = require('./controller/loginController')

let app = express()


require("./config/database")

app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())
app.use('/premissions',premissonController)
app.use('/users',userController)
app.use('/logins',loginController)

Utils.getPremissionsAndSaveInDB()
Utils.getUsersAndSaveInDB()
Utils.addUserObjIdToDb()
Utils.addPremissionObjIdToDb()
 

  
  
app.listen(8001,()=>{
    console.log("The server is up");
})