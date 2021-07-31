import React from "react";
import { Link } from "react-router-dom";
import logout from '../images/logout.png'

import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"

import '../css/mainsheet.css'

export default function LoginDropdown() {
  
let role = sessionStorage.getItem("role")

    return (
        <Dropdown
            color="gray-800"
            placement="bottom-start"
            buttonText={<img src={logout} height="50px" width="50px"></img>}
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            ripple="light"
        >   
           
           
                <span className="p-4"  >
                Signed in as : <b>{role}</b> 

                </span>
           
          
            

            <span >
             <DropdownItem color="gray">
            <Link to="/">Sign out</Link>
            </DropdownItem>
            </span>
            
            
           
        </Dropdown>
    )
}