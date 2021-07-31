
import React,{useEffect,useState} from 'react';
import {Switch, Route} from 'react-router-dom'
import axios from 'axios';

import showSubs from './ShowSubs'
import createSubs from './CreateSubs';
import editSubs from './EditSubs';
import addMovie from './AddMovie';

import '../css/mainsheet.css'


const Subs = (props) => {

    const [prem,setPrems] = useState([])


    //componetDidMount
    useEffect(async() => {

        const resp = await axios.get('http://localhost:8001/premissions')
        setPrems(resp.data)

        
        },[])
let createSubCheck=""
let role = sessionStorage.getItem("role")

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
    let createSubSpan = document.getElementById("create")
    createSubSpan.className = "dispaly"
}
  

    const redShowSubs = () => {
        props.history.push('/main/subs/showsubs')
    }

    const redCreateSubs = () => {
        props.history.push('/main/subs/createsubs')
    }
        

    return (
        <div  className=" text-center">
          <input type="button"  className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 m-2 rounded cursor-pointer" value="All Members" onClick={redShowSubs}  />
          <span className="hidden" id="create"> <input type="button"className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 m-2 rounded cursor-pointer" value="Add Member" onClick={redCreateSubs}  />  </span>
        
          <Switch>
         <Route path="/main/subs/showsubs"  component={showSubs}  /> 
         <Route path="/main/subs/createsubs"  component={createSubs}  /> 
         <Route path="/main/subs/editsub"  component={editSubs}  /> 
         <Route path="/main/subs/addmovie"  component={addMovie}  /> 
         
         </Switch>
        
           
        </div>
    );
};

export default Subs;