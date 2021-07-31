import React,{useEffect,useState} from 'react';
import axios from 'axios';

const EditMovie = (props) => {
    
    const [name,setName] = useState("")
    const [genres,setGenres] = useState("")
    const [image,setImage] = useState("")
    const [date,setDate] = useState("")
    const [movieId,setmovieId] = useState("")


    useEffect(async() => {

    //json mount
    let jsonData = JSON.parse(sessionStorage.getItem("data"))
        

    let nameObj = document.getElementById("name").value = jsonData.name
    let genresObj = document.getElementById("genres").value = jsonData.genres
    let imageObj = document.getElementById("img").value = jsonData.image
    let dateObj = jsonData.date
    let movieIdObj = jsonData.movieId

    setName(nameObj)
    setGenres(genresObj)
    setImage(imageObj)
    setDate(dateObj)
    setmovieId(movieIdObj)

    },[])
    const save = () =>{
    let moiveObj = {name:name,image:image,premiered:date,genres:genres}
    

    if(name == "" || image == "" || date == "" || genres == ""){
       alert("Fill in all of the Fields")
      }
      else{
        axios.put(`http://localhost:8000/movies/${movieId}`,moiveObj)
        props.history.push('/main/showmovies')
      }
     
   


    

}
     const cancel = () =>{

        props.history.push('/main/showmovies')

    }

    
    return (
        <div className="text-xl text-center">
          <br></br>
            <b>Edit Movie:</b> <br></br><br></br>
             <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded " placeholder="Name" id="name" onChange={(e)=>setName(e.target.value)} />          <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="Genres" id="genres" onChange={(e)=>setGenres(e.target.value)} />           <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="Image URL " id="img" onChange={(e)=>setImage(e.target.value)} />            <br></br>
        <b>Premiered Date:  </b><input type="date" className="ml-2 my-1 shadow appearance-none border border-gray-800 rounded" id="date" onChange={(e)=>setDate(e.target.value)} />                                     <br></br>
        <input type="button"  className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 m-2 my-4 rounded cursor-pointer" value="Save" onClick={save} />
        <input type="button"  className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 m-2 my-4 rounded cursor-pointer" value="Cancel" onClick={cancel} />
        </div>
    );
};

export default EditMovie;