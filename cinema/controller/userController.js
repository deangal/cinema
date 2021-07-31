const express = require('express')
const appRouter = express.Router()
const userBL = require('../models/usersBL')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const axios = require('axios')

let accsesToken = ""
let checkTrue = false


appRouter.route('/').get(async(req,resp)=>{
    if(checkTrue == true){
        const users = await userBL.getAllUsers()
        return resp.json(users)
    }
    
    
})


appRouter.route('/:id').get(async(req,resp)=>{
    
    const id = req.params.id
    const user = await userBL.getUserById(id)
    return resp.json(user)
})

appRouter.route('/').post(async(req,resp)=>{
    const userObj = req.body;
    const user = await userBL.addUser(userObj)
    return resp.json(user)

})

appRouter.route('/key').post(async(req,resp)=>{
    const keyObj = await axios.get('http://localhost:8001/logins')
    const logins = keyObj.data
    logins.forEach(element => {
        if( req.body.username == element.username &&  req.body.password == element.password){
             accsesToken = jwt.sign(element , process.env.ACCSES_TOKEN_SECRET)
             checkTrue = true
        }
    });
   
   
        return resp.json({accsesToken : accsesToken ,checkTrue:checkTrue })
   

})


appRouter.route('/:id').put(async(req, resp)=>{
    const id = req.params.id
    const userObj = req.body
    const result = await userBL.updateUser(id,userObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    const id = req.params.id
    const result = await userBL.deleteUser(id)
    return resp.json(result)
})



module.exports = appRouter

