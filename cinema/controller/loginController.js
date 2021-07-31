
const express = require('express')
const appRouter = express.Router()
const loginBL = require('../models/loginBL')

appRouter.route('/').get(async(req,resp)=>{
    const logins = await loginBL.getAllLogins()
    return resp.json(logins)
})


appRouter.route('/:id').get(async(req,resp)=>{
    const id = req.params.id
    const login = await loginBL.getLoginById(id)
    return resp.json(login)
})

appRouter.route('/').post(async(req,resp)=>{
    const loginObj = req.body;
    const login = await loginBL.addLogin(loginObj)
    return resp.json(login)

})

appRouter.route('/:id').put(async(req, resp)=>{
    const id = req.params.id
    const loginObj = req.body
    const result = await loginBL.updateLogin(id,loginObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    const id = req.params.id
    const result = await loginBL.deleteLogin(id)
    return resp.json(result)
})



module.exports = appRouter

