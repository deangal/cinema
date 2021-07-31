
const Movie = require('./movieSchema')



const getAllMovies = ()=> {

    return new Promise((resolve, reject)=>{
        Movie.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}

const getMovieById = (MovieId)=> {
    return new Promise((resolve, reject)=>{
       Movie.findById(MovieId,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}




const addMovie = (newMovie)=> {
    return new Promise((resolve,reject)=> {

        let movie = new Movie({
            name : newMovie.name,
            genres : newMovie.genres,
            image : newMovie.image,
            premiered :new Date(newMovie.premiered)
        })
        console.log(movie);
        movie.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(movie)
            }
        })
    })
}


const updateMovie = (MovieId, updatedData) => {
    return new Promise((resolve, reject)=>{
        Movie.findByIdAndUpdate(MovieId,{
            name : updatedData.name,
            genres : updatedData.genres,
            image : updatedData.image,
            premiered : updatedData.premiered
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("Moive was updated!")
            }
        })

    })
}

const deleteMovie = (MovieId)=> {
    return new Promise((resolve,reject)=>{
        Movie.findByIdAndDelete(MovieId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Moive deleted!!!")
            }
        })
    })
}

module.exports = {getAllMovies,getMovieById,addMovie,updateMovie,deleteMovie}