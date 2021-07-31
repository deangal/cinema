const Login = require('../models/loginSchema')


const getAllLogins = ()=> {

    return new Promise((resolve, reject)=>{
        Login.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}

const getLoginById = (loginId)=> {
    return new Promise((resolve, reject)=>{     
        Login.findById(loginId,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}



const addLogin = (newLogin)=> {
    return new Promise((resolve,reject)=> {

        const login = new Login({
            username: newLogin.username,
            password: newLogin.password,
            role: newLogin.role,
            userId:newLogin.userId
        })
        login.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(login)
            }
        })
    })
}


const updateLogin = (loginId, updatedData) => {
    return new Promise((resolve, reject)=>{
        Login.findByIdAndUpdate(loginId,{
            username: updatedData.username,
            password: updatedData.password,
            role:updatedData.role,
            userId:updatedData.userId
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("Login was updated!")
            }
        })

    })
}

const deleteLogin = (loginId)=> {
    return new Promise((resolve,reject)=>{
        Login.findByIdAndDelete(loginId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Login deleted!!!")
            }
        })
    })
}
module.exports = {getAllLogins,getLoginById,addLogin,updateLogin,deleteLogin}

