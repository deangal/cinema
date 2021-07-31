import React from "react";
import { Link } from "react-router-dom";

import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"

import '../css/mainsheet.css'


export default function UserDropdown() {
   
    return (
        <Dropdown
            color="gray-800"
            placement="bottom-start"
            buttonText="User Management"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            ripple="light"
        >   
            <span >
            <DropdownItem color="gray">
            <Link to="/main/users">All Users</Link>
            </DropdownItem>
            </span>
            

            <span >
             <DropdownItem color="gray">
            <Link to="/main/createusers">Create User</Link>
            </DropdownItem>
            </span>
            
            
           
        </Dropdown>
    )
}