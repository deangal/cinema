import React, { useState, useEffect } from "react";
import axios from "axios";
const AddMovie = (props) => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [memberId, setMemberId] = useState("");
  const [subId, setSubId] = useState("");
  const [MovieArr, setMovieArr] = useState("");

  //componetDidMount
  useEffect(async () => {
    const resp = await axios.get("http://localhost:8000/movies");
    let jsonData = JSON.parse(sessionStorage.getItem("data"));

    let memberIdObj = jsonData.memberId;
    let subIdObj = jsonData.subId;
    let MovieArrObj = jsonData.movies;
    setMemberId(memberIdObj);
    setSubId(subIdObj);
    setMovies(resp.data);
    setMovieArr(MovieArrObj);
  }, []);

  let data = [];
  let movieid = "";
  movies.map((item, index) => {
    return data.push({ id: item._id, name: item.name, index: index });
  });

  let optionObj = data.map((item, index) => {
    return (
      <option key={index} id={item._id} value={item._id}>
        {item.name}{" "}
      </option>
    );
  });

  const cancel = () => {
    props.history.push("/main/showsubs");
  };

  const create = () => {
    if (subId == undefined) {
      let addSubObj = {
        memberId: memberId,
        movies: [{ movieId: movieid, date: date }],
      };
      if (date == "" || movieid == "") {
        alert("fill in all the fields");
      } else {
        axios.post(`http://localhost:8000/subs`, addSubObj);
        props.history.push("/main/showsubs");
      }
    } else {
      MovieArr.push({ movieId: movieid, date: date });
      let addMovieObj = { memberId: memberId, movies: MovieArr };

      axios.put(`http://localhost:8000/subs/${subId}`, addMovieObj);
      props.history.push("/main/showsubs");
    }
  };

  movies.forEach((item) => {
    if (name == item.name) {
      movieid = item._id;
    }
  });

  return (
    <div className="my-32 text-xl">
      <br></br>
      <b>Add Movie:</b> <br></br>
      <br></br>
      <b className="mr-2">Select Movie:</b>
      <select
        type="select"
        className="shadow appearance-none border border-gray-800 rounded"
        id="movie"
        onChange={(e) => setName(e.target.value)}
      >
        <option> </option>

        {optionObj}
      </select>{" "}
      <br></br>
      <br></br>
      <b className="mr-2">Date Watched: </b>
      <input
        type="date"
        id="date"
        className="shadow appearance-none border border-gray-800 rounded"
        onChange={(e) => setDate(e.target.value)}
      />
      <br></br>
      <input
        type="button"
        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 m-2 rounded cursor-pointer"
        value="Create"
        onClick={create}
      />
      <input
        type="button"
        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 m-2 my-4 rounded cursor-pointer"
        value="Cancel"
        onClick={cancel}
      />
    </div>
  );
};

export default AddMovie;
