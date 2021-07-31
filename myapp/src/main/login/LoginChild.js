import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

   
    const LoginChild = (props) => {

        const [logins,setLogins] = useState([])
        const [users,setUsers] = useState([])
        const [username,setUsername] = useState("")
        const [password,setPassword] = useState("")
        const [bool,setbool] = useState(false)

    
       

        //Send Data to logins ws
        useEffect(async() => {
          const uresp = await axios.get('http://localhost:8001/users')  /* .then(data=>) */
          const resp = await axios.get('http://localhost:8001/logins')
             
          setLogins(resp.data)
          setUsers(uresp.data)

        },[])

        let usernameData = sessionStorage.getItem("username")
        let passwordData = sessionStorage.getItem("password")
        let checkPut = false

        if (usernameData != null && passwordData != null){
          logins.map(item =>{
            users.forEach(user =>{
              if(user.firstName == item.userId){
                let putObj = {username:usernameData, password:passwordData, role:item.role, userId:user._id}

                 axios.put(`http://localhost:8001/logins/${item._id}`, putObj)
                alert("created");
                checkPut = true

                }
            })
          })
         
          
        } 
        
        if(checkPut == true){
        sessionStorage.clear();

        }
        

        const redirectLogin = async() =>{
            let token = await axios.post("http://localhost:8001/users/key" , {username:username,password:password})
            logins.forEach(obj => {
              users.forEach(user => {
                if(user._id == obj.userId && obj.username == username && obj.password == password ){
                 let timeout = user.SessionTimeOut * 60 * 1000
                sessionStorage.setItem("timeout",timeout)
                }
              })
                if(obj.username == username && obj.password == password){
                  
                localStorage.setItem("token",token.data.accsesToken)
                sessionStorage.setItem("role",obj.role)
                 props.history.push('/main')
                           }
                   else{    
                    console.log("error");
                   }
            });
           

        }

       
        const showPass = () =>{
            
             let elemnt = document.getElementById("pass")
             let button = document.getElementById("show")
             setbool(!bool) 
            if (bool==false){
             elemnt.type = "text"
             button.value = "Hide"

             } 
             else
             { 
             button.value = "Show"
             elemnt.type = "password"  
            }
            
        }
            
            

    return (
     // Login page
        <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center    ">
        <div className=" mx-auto text-center ">
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
            <div className="h-10 bg-red-400 rounded-t-md text-center"> <span className=" text-xl  mr-2 font-bold">Login</span> </div>
          
            <div className="py-4 px-8">
              <label className="block font-semibold" >Username</label>
              <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-red-600 rounded-md"/>
              <label className="block mt-3 font-semibold">Password</label>
              <input type="password" placeholder="Password" id="pass" onChange={(e)=>setPassword(e.target.value)} className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-red-600 rounded-md"/>
              <div className="flex justify-between items-baseline">
                <button className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-lg"  onClick={redirectLogin}>Login</button>
            
                <Link to="/createlogin">New user?</Link>
              </div>
            </div>
          </div>
        </div>
        
      </div>
  

    );
    
};


export default LoginChild;

//  <div className=" text-2xl">
// <br></br><br></br><br></br><br></br><br></br><br></br>
// <b>Login Page</b><br></br><br></br>
// <input type="text"  defaultValue=""  placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/><br></br> 
// <input type="password"  defaultValue=""  placeholder="Password" id="pass" onChange={(e)=>setPassword(e.target.value)}/><br></br>
// <input type="button" value="Show" id="show" onClick={showPass}/><br></br><br></br>

// <input type="button" value="Login" onClick={redirectLogin}/><br></br><br></br>
// <span>New user?:</span>


//    <Link to="/createlogin">Create Login</Link>




// </div> 