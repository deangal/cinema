import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"

import '../css/mainsheet.css'

export default function MovieDropdown() {
    const [prem,setPrems] = useState([])


    //componetDidMount
    useEffect(async() => {

        const resp = await axios.get('http://localhost:8001/premissions')
        setPrems(resp.data)

        
        },[])
let showDisplay = "hidden"
let createDisplay = "hidden"
let createMovieCheck = ""
let showMovieCheck = ""
let role = sessionStorage.getItem("role")

 //show movie premission check
 prem.forEach(item => {

    if(role == item.role){
       
    item.premissions.forEach(element => {
        if(element == "View Movies"){
            showMovieCheck = "true"
            
        }
        
});
}
});

      //create movie premission check
      prem.forEach(item => {

        if(role == item.role){
           
        item.premissions.forEach(element => {
            if(element == "Create Movies"){
                createMovieCheck = "true"
                
            }
            
    });
   }
});

if(createMovieCheck == "true"){
   createDisplay = "display"
}

if(showMovieCheck == "true"){
    showDisplay = "display"
 }


    return (
        <Dropdown
            color="gray-800"
            placement="bottom-start"
            buttonText="Movies"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            ripple="light"
        >   
            <span className={showDisplay}>
            <DropdownItem color="gray">
            <Link to="/main/showmovies">All Movies</Link>
            </DropdownItem>
            </span>
            

            <span className={createDisplay}>
             <DropdownItem color="gray">
            <Link to="/main/createmovie">Create Movie</Link>
            </DropdownItem>
            </span>
            
            
           
        </Dropdown>
    )
}