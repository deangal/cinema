
let UserSchema = require('../models/userSchema')
let PremissionSchema = require('../models/premissionSchema')
let usersBL = require('../models/usersBL')
let premissonBL = require('../models/premissionBL')



const getPremissionsAndSaveInDB = async() =>{
    let empty = await PremissionSchema.find({})
    if (empty.length == 0){
        let getPremissonsData = await premissonBL.getAllPremissions()
        for (let i=0;  i < getPremissonsData.length; i++){
            let premisson = getPremissonsData[i]
            let premissonObj = {
                role: premisson.role,
                premissions  : premisson.premissions
                
            }
            await premissonBL.addPremissionToDb(premissonObj)
        }
    }

}

const getUsersAndSaveInDB = async() =>{
    let empty = await UserSchema.find({})
    if (empty.length == 0){
        let getUsersData = await usersBL.getAllUsers()
       
        for (let i=0;  i < getUsersData.length; i++){
            let user = getUsersData[i]
            let userObj = {
                firstName: user.firstName,
                lastName : user.lastName,
                createdDate : user.createdDate,
                SessionTimeOut : user.SessionTimeOut
                
            }
            await usersBL.addUserToDb(userObj)
        }
    }

}

const addUserObjIdToDb = async() =>{
    let getUsersData = await usersBL.getAllUsersFromDb()
    {console.log(getUsersData)}
}

const addPremissionObjIdToDb = async() =>{
    let getPremissionsData = await premissonBL.getAllPremissionsFromDb()
    {console.log(getPremissionsData)}
}



module.exports = {getPremissionsAndSaveInDB,getUsersAndSaveInDB,addUserObjIdToDb,addPremissionObjIdToDb}
