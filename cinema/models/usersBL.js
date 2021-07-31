let User = require('../models/userSchema')
const jfile = require('jsonfile')

const userFile = './users.json'

const getAllUsers= ()=>{

    return new Promise((resolve,reject)=>{

        User.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}

const getAllUsersFromDb= ()=>{

    return new Promise((resolve, reject)=>{
        User.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                 
                jfile.writeFile(userFile,data,(err)=>{
                if(err){
                    reject(err)
                }else {
                    resolve("User Imported!")
                }
            })
               
            }
        })

    })
}


const getUserById= (id)=>{

    return new Promise((resolve,reject)=>{

        User.findById(id,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const addUserToDb = (newUser)=> {
    return new Promise((resolve,reject)=> {

        let user = new User({
            
            firstName : newUser.firstName,
            lastName : newUser.lastName,
            createdDate :new Date(newUser.createdDate),
            SessionTimeOut : newUser.SessionTimeOut,
           
            
        })
        console.log(user);
        user.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(user)

            }
        })
    })
}


const addUser = (obj) => {

    return new Promise((resolve, reject)=>{
        jfile.readFile(userFile,(err, data)=>{
            if(err){
                reject(err)
            } 
            else {
            
                    data.push(obj) 
                    addUserToDb(obj)
                    jfile.writeFile(userFile,data,(err)=>{
                    if(err){
                        reject(err)
                    }else {
                        resolve("User Created!")

                    }
                })
            }
            
        })
       
    }) 
        
} 



const deleteUser = (id) => {

    return new Promise((resolve, reject)=>{


        const index = userFile.findIndex(item=>item.id == id)
        
    
        jfile.writeFile(userFile,userFile.splice(index,1),(err)=>{
            if(err){
                reject(err)
            }else {
                resolve("User Deleted!")
            }
        })
    } ) 
} 

const updateUser = (id,updatedUser) => {

    return new Promise((resolve, reject)=>{

        User.findByIdAndUpdate(id,{
            firstName : updatedUser.firstName,
            lastName : updatedUser.lastName,
            SessionTimeOut : updatedUser.SessionTimeOut,
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
               resolve("User updated!")  
               getAllUsersFromDb()
            }
        })

    })
}
    // func x = ()=>{
    //     try{
    //         updateUser(x,y)
    //     }catch(err){
            
    //     }
    // }




module.exports = {getAllUsers,getUserById,addUser,updateUser,deleteUser,addUserToDb ,getAllUsersFromDb}