const express = require('express')
const appRouter = express.Router()
const movieBL = require('../models/movieBL')



appRouter.route('/').get(async(req,resp)=>{
    const movies = await movieBL.getAllMovies()
    return resp.json(movies)
})


appRouter.route('/:id').get(async(req,resp)=>{
    const id = req.params.id
    const movie = await movieBL.getMovieById(id)
    return resp.json(movie)
})

appRouter.route('/').post(async(req,resp)=>{
    const movieObj = req.body;
    const movie = await movieBL.addMovie(movieObj)
    return resp.json(movie)

})

appRouter.route('/:id').put(async(req, resp)=>{
    const id = req.params.id
    const movieObj = req.body
    const result = await movieBL.updateMovie(id,movieObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    const id = req.params.id
    const result = await movieBL.deleteMovie(id)
    return resp.json(result)
})



module.exports = appRouter

