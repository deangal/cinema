import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/mainsheet.css";

const ShowSubs = (props) => {
  const [subs, setSubs] = useState([]);
  const [members, setMembers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [prem, setPrems] = useState([]);

  //componetDidMount
  useEffect(async () => {
    const mresp = await axios.get("http://localhost:8000/members");
    const resp = await axios.get("http://localhost:8000/subs");
    const moviesresp = await axios.get("http://localhost:8000/movies");
    const presp = await axios.get("http://localhost:8001/premissions");

    setPrems(presp.data);
    setMembers(mresp.data);
    setSubs(resp.data);
    setMovies(moviesresp.data);
  }, []);
  // let membersIdArr = members.map((element) => {
  //     return element._id
  // })

  let editSubCheck = "";
  let deleteSubCheck = "";

  let role = sessionStorage.getItem("role");

  //edit sub premission check
  prem.forEach((item) => {
    if (role == item.role) {
      item.premissions.forEach((element) => {
        if (element == "Update Subscriptions") {
          editSubCheck = "true";
        }
      });
    }
  });

  //delete sub premission check
  prem.forEach((item) => {
    if (role == item.role) {
      item.premissions.forEach((element) => {
        if (element == "Delete Subscriptions") {
          deleteSubCheck = "true";
        }
      });
    }
  });

  const redEdit = (index) => {
    sessionStorage.setItem(`data`, JSON.stringify(data[index]));

    props.history.push("/main/editsub");
  };

  const del = (memberId) => {
    axios.delete(`http://localhost:8000/members/${memberId}`);
  };

  const addMovie = (index) => {
    sessionStorage.setItem(`data`, JSON.stringify(data[index]));

    props.history.push("/main/addmovie");
  };
  let itemObj = [];
  let movieObj = "";
  let data = [];
  let editCheck = "hidden";
  let deleteCheck = "hidden";

  members.map((element, index) => {
    data.push({
      name: element.name,
      city: element.city,
      email: element.email,
      index: index,
      memberId: element._id,
    });
  });

  members.map((element, index) => {
    subs.forEach((sub) => {
      if (element._id == sub.memberId) {
        data[index] = {
          name: element.name,
          city: element.city,
          email: element.email,
          index: index,
          movies: sub.movies,
          memberId: sub.memberId,
          subId: sub._id,
        };
      }
    });
  });

  let dataObj = data.map((element, index) => {
    if (element.movies == null) {
      if (editSubCheck == "true") {
        editCheck = "display";
      }
      if (deleteSubCheck == "true") {
        deleteCheck = "display";
      }

      return (
        <div
          className="bg-gray-300 ml-auto mr-auto my-4 w-1/4 text-xl rounded"
          key={index}
        >
          <h3>
            <b>Name: </b> {element.name}
          </h3>
          <b>Email: </b>
          {element.email} <br></br>
          <b>City: </b>
          {element.city} <br></br>
          <span className={editCheck} id="edit">
            {" "}
            <input
              type="button"
              className="my-6 mx-2 bg-gray-700 hover:bg-gray-500 p-1 py-1 font-bold text-white rounded cursor-pointer "
              value="Edit"
              onClick={redEdit.bind("index", index)}
            />{" "}
          </span>
          <span className={deleteCheck} id="delete">
            <input
              type="button"
              className="my-6 mx-2 bg-gray-700 hover:bg-gray-500 p-1  font-bold text-white rounded cursor-pointer "
              value="Delete"
              onClick={del.bind("memberId", element.memberId)}
            />{" "}
          </span>{" "}
          <br></br>
          <div className="text-xl font-bold border-red-500">
            The member is not a subscription!
          </div>{" "}
          <br></br>
          <input
            type="button"
            className="my-6 mx-2 bg-gray-700 hover:bg-gray-500 p-1 font-bold text-white rounded cursor-pointer "
            value="New Movie"
            onClick={addMovie.bind("index", index)}
          />{" "}
          <br></br>
        </div>
      );
    } else {
      element.movies.map((item) => {
        movies.map((movieItem) => {
          if (movieItem._id == item.movieId) {
            movieObj = item.date.slice(0, 10) + " " + movieItem.name;
            itemObj.push({ index: index, movies: movieObj });
          }
        });
      });

      if (editSubCheck == "true") {
        editCheck = "display";
      }
      if (deleteSubCheck == "true") {
        deleteCheck = "display";
      }
    }
    return (
      <div
        className="bg-gray-300 ml-auto mr-auto my-4 w-1/4 text-xl rounded"
        key={index}
      >
        {" "}
        <h3>
          {" "}
          <b>Name: </b>
          {element.name}
        </h3>
        <b>Email: </b>
        {element.email} <br></br>
        <b>City: </b>
        {element.city} <br></br>
        <span className={editCheck} id="edit">
          {" "}
          <input
            type="button"
            className="my-6 mx-2 bg-gray-700 hover:bg-gray-500 p-1 py-1 font-bold text-white rounded cursor-pointer"
            value="Edit"
            onClick={redEdit.bind("index", index)}
          />{" "}
        </span>
        <span className={deleteCheck} id="delete">
          <input
            type="button"
            className="my-6 mx-2 bg-gray-700 hover:bg-gray-500 p-1 py-1 font-bold text-white rounded  cursor-pointer"
            value="Delete"
            onClick={del.bind("memberId", element.memberId)}
          />{" "}
        </span>
        <h3 className="text-xl font-bold border-red-500">Movies Watched:</h3>
        {itemObj.map((item, index) => {
          if (element.index == item.index) {
            return <div key={index}> {item.movies}</div>;
          }
        })}
        <input
          type="button"
          className="my-2 mx-2 bg-gray-700 hover:bg-gray-500 text-lg p-1 font-bold text-white rounded cursor-pointer "
          value="New Movie"
          onClick={addMovie.bind("index", index)}
        />{" "}
        <br></br>
      </div>
    );
  });

  return <div>{dataObj}</div>;
};

export default ShowSubs;
