
import showUsers from './ShowUsers';
import createUsers from './CreateUsers';
import editUser from './EditUser';

import React from 'react';
import { Switch,Route } from 'react-router-dom';
const Users = (props) => {

  

    const redShowUsers = () => {
        props.history.push('/main/usersmanage/users')
    }

    const redCreateUsers = () => {
        props.history.push('/main/usersmanage/createusers')
    }
        

    return (
        <div  className=" text-center">
          <input type="button" className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 m-2 rounded cursor-pointer" value="All Users" onClick={redShowUsers}  />
          <span><input type="button" className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 m-2 rounded cursor-pointer" value="Add User" onClick={redCreateUsers}  /></span>
         <Switch>
         <Route path="/main/usersmanage/users" component={showUsers}  />  
         <Route path="/main/usersmanage/createusers"  component={createUsers}  />  
         <Route path="/main/usersmanage/edituser"  component={editUser}  /> 

         </Switch>
         
       
           
        </div>
    );
};

export default Users;