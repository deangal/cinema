import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import EditMovie from "./moviesComp/EditMovie";
import CreateMovie from "./moviesComp/CreateMovie";
import MoviesFilter from "./moviesComp/MoviesFilter";

import ShowSubs from "./subs/ShowSubs";
import CreateSubs from "./subs/CreateSubs";
import EditSubs from "./subs/EditSubs";
import AddMovie from "./subs/AddMovie";

import ShowUsers from "./users/ShowUsers";
import CreateUsers from "./users/CreateUsers";
import EditUser from "./users/EditUser";

import img1 from "./images/logo.png";
import img2 from "./images/pop.png";
import bgimg from "./images/bg.jpg";
import ig from "./images/ig.png";
import fb from "./images/fb.png";
import twitter from "./images/twitter.png";

import MoviesDropdown from "./dropdown/MoviesDropdown";
import SubsDropdown from "./dropdown/SubsDropdown";
import UserDropdown from "./dropdown/UserDropdown";
import LoginDropdown from "./dropdown/LoginDropdown";
import "./css/mainsheet.css";
import "./css/main.css";

const Main = (props) => {
  const [prem, setPrems] = useState([]);

  useEffect(async () => {
    const resp = await axios.get("http://localhost:8001/premissions");
    setPrems(resp.data);

    //timeout
    let role = sessionStorage.getItem("role");
    let timeout = sessionStorage.getItem("timeout");
    if (role == "admin") {
      let userSpan = document.getElementById("user");
      userSpan.className = "dispaly";
    }
    setTimeout(function () {
      alert("Your session is over");
      props.history.push("/");
    }, timeout);
  }, []);
  let url = window.location.href.toString();
  let viewMovieCheck = "";
  let viewSubCheck = "";
  let bgImage;
  let role = sessionStorage.getItem("role");

  if (url !== "http://localhost:3000/main") {
    bgImage = undefined;
  } else {
    bgImage = (
      <img
        id="bgimg"
        src={bgimg}
        className={`w-full h-100 ml-auto mr-auto filter blur-lg rounded`}
      ></img>
    );
  }
  //sub premission check
  prem.forEach((item) => {
    if (role == item.role) {
      item.premissions.forEach((element) => {
        if (element == "View Subscriptions") {
          viewSubCheck = "true";
        }
      });
    }
  });

  if (viewSubCheck === "true") {
    let subSpan = document.getElementById("sub");
    subSpan.className = "dispaly";
  }
  //movie premission check
  prem.forEach((item) => {
    if (role == item.role) {
      item.premissions.forEach((element) => {
        if (element == "View Movies") {
          viewMovieCheck = "true";
        }
      });
    }
  });

  if (viewMovieCheck === "true") {
    let movieSpan = document.getElementById("movie");
    movieSpan.className = "dispaly";
  }

  const redirectMain = () => {
    props.history.push("/main");
  };
  let token = localStorage.getItem("token");
  if (token != null) {
    return (
      <div className="bg-popcorn   text-center">
        {/* nav bar */}
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 ">
          <div className="flex items-center flex-shrink-0 text-white mr-6 ">
            <img src={img1} width="400px" height="500px"></img>
            <input
              type="image"
              src={img2}
              onClick={redirectMain}
              className="mb-4"
              width="50px"
              height="50px"
            ></input>
          </div>
          <span className="hidden" id="movie">
            {" "}
            <MoviesDropdown />{" "}
          </span>
          <span className="hidden" id="sub">
            {" "}
            <SubsDropdown />{" "}
          </span>
          <span className="hidden" id="user">
            {" "}
            <UserDropdown />{" "}
          </span>

          <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
            <div className="text-sm sm:flex-grow"></div>

            <div>
              <LoginDropdown />
            </div>
          </div>
        </nav>

        <div className="bg-popcorn">
          <Switch>
            <Route path="/main/showsubs" component={ShowSubs} />
            <Route path="/main/createsubs" component={CreateSubs} />
            <Route path="/main/editsub" component={EditSubs} />
            <Route path="/main/addmovie" component={AddMovie} />

            <Route path="/main/users" component={ShowUsers} />
            <Route path="/main/createusers" component={CreateUsers} />
            <Route path="/main/edituser" component={EditUser} />

            <Route path="/main/showmovies" component={MoviesFilter} />
            <Route path="/main/createmovie" component={CreateMovie} />
            <Route path="/main/editmovie" component={EditMovie} />
          </Switch>
        </div>

        {bgImage}

        {/* footer */}

        <div className="flex flex-wrap justify-center bg-black p-6 text-white">
          <div className="flex flex-wrap mb-4 w-full">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 ">
              <h3 className="text-3xl py-4">About Us</h3>
              <p>
                We are a cinema that gives free popcorn and provides high
                quaility visual and audio experience bring your kids uncles and
                sisters <br></br>
                Butter Avenue 619 , Israel , Nahariya <br></br>
                Phone : +972 54-444-789
              </p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 pl-8">
              <h3 className="text-3xl py-4 "></h3>
              <ul>
                <li>
                  <img
                    src={ig}
                    className="rounded-full cursor-pointer ring-2-red ml-auto mr-auto display:block bg-gray-800 hover:bg-gray-400 w-16"
                  ></img>
                </li>
                <br></br>
                <li>
                  <img
                    src={fb}
                    className="rounded-full cursor-pointer ring-2-red ml-auto mr-auto display:block bg-gray-800 hover:bg-gray-400 w-16"
                  ></img>
                </li>
                <br></br>
                <li>
                  <img
                    src={twitter}
                    className="rounded-full cursor-pointer ring-2-red ml-auto mr-auto display:block bg-gray-800 hover:bg-gray-400 w-16"
                  ></img>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3">
              <h3 className="text-3xl py-4">Contact Us</h3>
              <form action="#">
                <div className="mb-4">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                    id="inline-full-name"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <input
                  className="bg-red-600 cursor-pointer hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="bg-popcorn text-white p-2 pl-6">
          <p className="bottom">© Copyright 2021 - PopcornCinema.com</p>
        </div>
      </div>
    );
  }
};
export default Main;
