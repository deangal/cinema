const express = require('express')
const appRouter = express.Router()
const memberBL = require('../models/memberBL')



appRouter.route('/').get(async(req,resp)=>{
    const members = await memberBL.getAllMembers()
    return resp.json(members)
})


appRouter.route('/:id').get(async(req,resp)=>{
    const id = req.params.id
    const member = await memberBL.getMemberById(id)
    return resp.json(member)
})

appRouter.route('/').post(async(req,resp)=>{
    const memberObj = req.body;
    const member = await memberBL.addMember(memberObj)
    return resp.json(member)

})

appRouter.route('/:id').put(async(req, resp)=>{
    const id = req.params.id
    const memberObj = req.body
    const result = await memberBL.updateMember(id,memberObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    const id = req.params.id
    const result = await memberBL.deleteMember(id)
    return resp.json(result)
})



module.exports = appRouter

