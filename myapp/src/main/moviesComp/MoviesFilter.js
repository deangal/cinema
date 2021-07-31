import React,{useEffect,useState} from 'react';
import axios from 'axios';
import ShowMovies from './ShowMovies';
import Pagination from './Pagination';

const MoviesFilter = (props) => {

    const [currentPage,setCurrentPage] = useState(1)
    const [PostsPerPage,setPostsPerPage] = useState(20)
    const [movies,setMovies] = useState([])

    useEffect(async() => {

        const resp = await axios.get('http://localhost:8000/movies')
       
        setMovies(resp.data)
        },[])

        

    const indexOfTheLastMovie = currentPage * PostsPerPage
        const indexOfThefirstMovie = indexOfTheLastMovie - PostsPerPage
        const currentMovies = movies.slice(indexOfThefirstMovie,indexOfTheLastMovie )

       const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div>
< Pagination PostsPerPage={PostsPerPage} totalPosts={movies.length} paginate={paginate} />    

< ShowMovies currentMovies={currentMovies} props={props} />  
< Pagination PostsPerPage={PostsPerPage} totalPosts={movies.length} paginate={paginate} />    
     </div>
    );
};

export default MoviesFilter;