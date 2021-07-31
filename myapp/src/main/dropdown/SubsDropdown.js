import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"

import '../css/mainsheet.css'

export default function SubsDropdown() {
    const [prem,setPrems] = useState([])


    //componetDidMount
    useEffect(async() => {

        const resp = await axios.get('http://localhost:8001/premissions')
        setPrems(resp.data)

        
        },[])
        
let showDisplay = "hidden"
let createDisplay = "hidden"
let createSubCheck = ""
let showSubCheck = ""
let role = sessionStorage.getItem("role")

 //show sub premission check
 prem.forEach(item => {

    if(role == item.role){
       
    item.premissions.forEach(element => {
        if(element == "View Subscriptions"){
            showSubCheck = "true"
            
        }
        
});
}
});

      //create sub premission check
      prem.forEach(item => {

        if(role == item.role){
           
        item.premissions.forEach(element => {
            if(element == "Create Subscriptions"){
                createSubCheck = "true"
                
            }
            
    });
   }
});

if(createSubCheck == "true"){
   createDisplay = "display"
}

if(showSubCheck == "true"){
    showDisplay = "display"
 }


    return (
        <Dropdown
            color="gray-800"
            placement="bottom-start"
            buttonText="Subscriptions"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            ripple="light"
        >   
            <span className={showDisplay}>
            <DropdownItem color="gray">
            <Link to="/main/showsubs">All Members</Link>
            </DropdownItem>
            </span>
            

            <span className={createDisplay}>
             <DropdownItem color="gray">
            <Link to="/main/createsubs">Create Member</Link>
            </DropdownItem>
            </span>
        
            
           
        </Dropdown>
    )
}