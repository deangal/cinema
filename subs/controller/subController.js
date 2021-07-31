const express = require('express')
const appRouter = express.Router()
const subBL = require('../models/subBL')



appRouter.route('/').get(async(req,resp)=>{
    const subs = await subBL.getAllSubs()
    return resp.json(subs)
})


appRouter.route('/:id').get(async(req,resp)=>{
    const id = req.params.id
    const sub = await subBL.getSubById(id)
    return resp.json(sub)
})

appRouter.route('/').post(async(req,resp)=>{
    const subObj = req.body;
    const sub = await subBL.addSub(subObj)
    return resp.json(sub)

})

appRouter.route('/:id').put(async(req, resp)=>{
    const id = req.params.id
    const subObj = req.body
    const result = await subBL.updateSub(id,subObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    const id = req.params.id
    const result = await subBL.deleteSub(id)
    return resp.json(result)
})



module.exports = appRouter

