import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowMovies = ({ props, currentMovies }) => {
  const [movies, setMovies] = useState([]);
  const [subs, setSubs] = useState([]);
  const [members, setMembers] = useState([]);
  const [prem, setPrems] = useState([]);

  const [searchData, setData] = useState("");

  //componetDidMount
  useEffect(async () => {
    const sresp = await axios.get("http://localhost:8000/subs");
    const mresp = await axios.get("http://localhost:8000/members");
    const presp = await axios.get("http://localhost:8001/premissions");
    const resp = await axios.get("http://localhost:8000/movies");

    setMovies(resp.data);
    setMembers(mresp.data);
    setSubs(sresp.data);
    setPrems(presp.data);
  }, []);

  /* let genresObj = movies.map((element,index) => {
            return <div>{element.genres}</div>
            
        })
 */

  let editMovieCheck = "";
  let deleteMovieCheck = "";

  let role = sessionStorage.getItem("role");

  //edit movie premission check
  prem.forEach((item) => {
    if (role == item.role) {
      item.premissions.forEach((element) => {
        if (element == "Update Movies") {
          editMovieCheck = "true";
        }
      });
    }
  });

  //delete movie premission check
  prem.forEach((item) => {
    if (role == item.role) {
      item.premissions.forEach((element) => {
        if (element == "Delete Movies") {
          deleteMovieCheck = "true";
        }
      });
    }
  });

  const search = (e) => {
    setData(e.target.value);
  };

  let data = [];
  let subData = [];
  currentMovies.map((item) => {
    data.push({
      name: item.name,
      genres: item.genres,
      image: item.image,
      date: item.premiered,
      movieId: item._id,
    });
  });

  subs.map((item) => {
    members.forEach((member) => {
      if (item.memberId == member._id) {
        subData.push({ name: member.name, movies: item.movies });
      }
    });
  });

  const redEdit = (index) => {
    sessionStorage.setItem(`data`, JSON.stringify(data[index]));

    props.history.push("/main/editmovie");
  };

  const del = (movieId) => {
    axios.delete(`http://localhost:8000/movies/${movieId}`);
  };

  let movieIndex = "";
  let itemObj = [];
  let DataObj = [];
  let filterUser = "";
  let movieObj = "";
  let editCheck = "hidden";
  let deleteCheck = "hidden";

  let obj = currentMovies.map((element, index) => {
    itemObj = subData.map((item) => {
      item.movies.forEach((movie) => {
        if (element._id == movie.movieId) {
          movieObj = movie.date.slice(0, 10) + " " + item.name;
          DataObj.push({ index: index, movies: movieObj });
        }
      });
    });

    if (element.name.toLowerCase().includes(searchData)) {
      filterUser = "block";
    } else filterUser = "none";

    if (editMovieCheck == "true") {
      editCheck = "display";
    }
    if (deleteMovieCheck == "true") {
      deleteCheck = "display";
    }
    movieIndex = index;

    return (
      <span
        className="my-8 bg-gray-200 w-1/3  ml-auto mr-auto display-block 200px rounded text-xl "
        key={index}
        style={{ display: `${filterUser}` }}
      >
        <b className="m-8  text-xl ">
          {element.name + "," + element.premiered.slice(0, 4)}
        </b>
        <br></br>
        <span className="m-8  text-xl ">{element.genres.join(" , ")}</span>
        <br></br>
        <img
          className="m-8 ml-auto mr-auto display-block rounded"
          src={element.image}
          alt={element.name}
          height="250  "
          width="270"
        />
        <br></br>
        <span className="m-8 font-bold text-xl ">
          Subscriptions Watched:
        </span>{" "}
        <br></br>
        {DataObj.map((item, index) => {
          if (movieIndex == item.index) {
            return (
              <span className="m-8 " key={index}>
                {" "}
                {item.movies}
                <br></br>
              </span>
            );
          }
        })}
        <span className={editCheck} id="edit">
          {" "}
          <input
            className="my-4 mx-8 bg-gray-700 hover:bg-gray-500 p-2 py-1 font-bold text-white rounded cursor-pointer "
            type="button"
            value="Edit"
            onClick={redEdit.bind("index", index)}
          />{" "}
        </span>
        <span className={deleteCheck} id="delete">
          <input
            className="my-4 mx-8 bg-gray-700 hover:bg-gray-500 p-2 py-1 font-bold text-white rounded cursor-pointer"
            type="button"
            value="Delete"
            onClick={del.bind("movieId", element._id)}
          />{" "}
        </span>
      </span>
    );
  });

  return (
    <div className=" text-center ">
      <b className="text-xl"> Search:</b>{" "}
      <input
        className=" my-4 shadow appearance-none border border-gray-800  rounded"
        type="text"
        onChange={search}
      />
      {obj}
    </div>
  );
};

export default ShowMovies;
