const express = require('express')
const appRouter = express.Router()
const premissionBL = require('../models/premissionBL')



appRouter.route('/').get(async(req,resp)=>{
    const premissions = await premissionBL.getAllPremissions()
    return resp.json(premissions)
})


appRouter.route('/:id').get(async(req,resp)=>{
    const id = req.params.id
    const premission = await premissionBL.getPremissionById(id)
    return resp.json(premission)
})

appRouter.route('/').post(async(req,resp)=>{
    const premissionObj = req.body;
    const premission = await premissionBL.addPremission(premissionObj)
    return resp.json(premission)

})

appRouter.route('/:id').put(async(req, resp)=>{
    const id = req.params.id
    const premissionObj = req.body
    const result = await premissionBL.updatePremission(id,premissionObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    const id = req.params.id
    const result = await premissionBL.deletePremission(id)
    return resp.json(result)
})



module.exports = appRouter

