import React,{useEffect,useState} from 'react';

import axios from 'axios';


const ShowUsers = (props) => {

    const [users,setUsers] = useState([])
    const [logins,setLogins] = useState([])
    const [prem,setPrems] = useState([])
     //componetDidMount
     useEffect(async() => {

        const resp = await axios.get('http://localhost:8001/users')
        const lresp = await axios.get('http://localhost:8001/logins/')
        const presp = await axios.get('http://localhost:8001/premissions')
        
        setPrems(presp.data)
        setUsers(resp.data)
        setLogins(lresp.data)
        },[])

        const redEditUser = (index) =>{
        
           
            sessionStorage.setItem(`data`,JSON.stringify(data[index]))
           
            
            props.history.push('/main/edituser')
         }

        let data = []
        let premObj = []
        let premId = ""

           logins.map((element,index) => {
           
            prem.forEach(prem => {
                if(prem.role == element.role){
                    premObj = prem.premissions
                    premId = prem._id      
                                
                }
            })

            users.forEach(user => {
                
               if(user._id == element.userId){
                  return data.push({username:element.username,
                                    firstName:user.firstName,
                                    lastName:user.lastName,
                                    createdDate:user.createdDate,
                                    premissions:premObj,
                                    SessionTimeOut:user.SessionTimeOut,
                                    userId:user._id,
                                    loginId:element._id,
                                    premId:premId,
                                    role:element.role,
                                    password:element.password,
                                    })
               }
               
          
              
           })
           
           })
           const del = (loginId) =>{
            axios.delete(`http://localhost:8001/logins/${loginId}`)
            
        } 
          
        let obj = data.map((element,index) => {
        
            return <div className="m-6  bg-gray-200  text-xl rounded"  key={index}>
                                   <b >Name</b>  : {element.firstName + " " + element.lastName}<br></br>
                                    <b>Created Date:</b> {element.createdDate.slice(0,10)}<br></br> 
                                    <b> Username : </b>{element.username} <br></br> 
                                    <b> Premissions : </b>{element.premissions.join(" , ")} <br></br>   
                                    <input type="button" className="my-6 mx-2 bg-gray-700 hover:bg-gray-500 p-2 py-1 font-bold text-white rounded cursor-pointer" value="Edit" onClick={redEditUser.bind("index",index)} />
                                    <input type="button" className="my-6 mx-2 bg-gray-700 hover:bg-gray-500 p-2 py-1 font-bold text-white rounded cursor-pointer " value="Delete"onClick={del.bind("userId",element.loginId)} />

                                    </div> 


            })


         let role = sessionStorage.getItem("role")
         if(role == "admin"){
    return (
        <div>
           
            {obj}
           
        </div>
    );
         }
};

export default ShowUsers;