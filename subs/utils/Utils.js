let axios = require('axios')
let movieSchema = require('../models/movieSchema')
let memberSchema = require('../models/memberSchema')
let memberBL = require('../models/memberBL')
let movieBL = require('../models/movieBL')
let subSchema = require('../models/subSchema')
let subBL = require('../models/subBL')


const getMoviesAndSaveInDB = async() =>{
    let empty = await movieSchema.find({})
    if (empty.length == 0){
        let getMovieData = await axios.get('https://api.tvmaze.com/shows')
        for (let i=0;  i < getMovieData.data.length; i++){
            let movie = getMovieData.data[i]
            let movieObj = {
                name  : movie.name,
                genres : movie.genres,
                image : movie.image.medium,
                premiered : movie.premiered
            }
            await movieBL.addMovie(movieObj)
        }
    }

}

const getMembersAndSaveInDB = async() =>{
    let empty = await memberSchema.find({})
    if (empty.length == 0){
        let getMemberData = await axios.get('https://jsonplaceholder.typicode.com/users')
        for (let i=0;  i < getMemberData.data.length; i++){
            let member = getMemberData.data[i]
            let memberObj = {
                name  : member.name,
                email : member.email,
                city : member.address.city,
               
            }
            await memberBL.addMember(memberObj)
        }
    }

}

const getSubsAndSaveInDB = async() =>{
    let empty = await subSchema.find({})
    if (empty.length == 0){
        let getSubData = subBL.getAllSubs()
        for (let i=0;  i < getSubData.data.length; i++){
            let sub = getSubData.data[i]
            let subObj = {
                memberId : sub.memberId,
                movies : sub.movies
               
            }
            await subBL.addSub(subObj)
        }
    }

}

module.exports = {getMembersAndSaveInDB,getMoviesAndSaveInDB,getSubsAndSaveInDB}
