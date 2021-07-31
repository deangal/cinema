import React from 'react';
import {Switch, Route} from 'react-router-dom'
import LoginChild from './login/LoginChild';
import CreateLogin from './login/Login';
import Main from './Main'


const HostComp = () => {
    return (
        <div >

             
               <Switch>
                <Route path="/" exact component={LoginChild}/>
                <Route path="/createlogin"  component={CreateLogin}  />

                <Route path="/main"  component={Main}  /> 
               
 
            </Switch>
        </div>
            

    );
};

export default HostComp;

