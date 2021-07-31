import React,{useEffect,useState} from 'react';
import axios from 'axios';

const EditUser = (props) => {

    

    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [username,setUsername] = useState("")
    const [timeout,setTimeout] = useState("")
    const [userId,setuserId] = useState("")
    const [loginId,setloginId] = useState("")
    const [premId,setpremId] = useState("")
    const [role,setrole] = useState("")
    const [password,setrpassword] = useState("")




    const [premcheck,setPremCheck] = useState([false,false,false,false,false,false,false,false])
     //componetDidMount
     useEffect(async() => {

        //json mount
        let jsonData = JSON.parse(sessionStorage.getItem("data"))
        setuserId(jsonData.userId)
        setloginId(jsonData.loginId)
        setpremId(jsonData.premId)
        //premissions mount
       jsonData.premissions.forEach(element =>{
            let check = document.getElementById(element)

            if(check != null){
                check.checked=true
                if(element == "View Subscriptions"){
                    premcheck[0]=true
                }
                else if(element == "Create Subscriptions"){
                    premcheck[1]=true
                }
                else if(element == "Delete Subscriptions"){
                    premcheck[2]=true
                }
                else if(element == "Update Subscriptions"){
                    premcheck[3]=true
                }
                else if(element == "View Movies"){
                    premcheck[4]=true
                }
                else if(element == "Create Movies"){
                    premcheck[5]=true
                }
                else if(element == "Delete Movies"){
                    premcheck[6]=true
                }
                else if(element == "Update Movies"){
                    premcheck[7]=true
                }

            }
       }) 

       //data mount
       let firstnameObj = document.getElementById("firstname").value = jsonData.firstName
       let lastnameObj = document.getElementById("lastname").value = jsonData.lastName
       let usernameObj = document.getElementById("username").value = jsonData.username
       let timeoutObj = document.getElementById("timeout").value = jsonData.SessionTimeOut
       
       
       setFirstname(firstnameObj)
       setLastname(lastnameObj)
       setUsername(usernameObj)
       setTimeout(timeoutObj)
       setrole(jsonData.role)
       setrpassword(jsonData.password)

       
        },[])


        const save = () =>{
        let premcheckObj = premcheck
        let premArr = []
        premcheckObj.forEach((element,index) => {
            if(element == true){
                if(index == 0){
                    premArr.push("View Subscriptions")
                  
                }
                else if(index == 1){
                    premArr.push("Create Subscriptions")
                }
                else if(index == 2){
                    premArr.push("Delete Subscriptions")
                }
                else if(index == 3){
                    premArr.push("Update Subscriptions")
                }
                else if(index == 4){
                    premArr.push("View Movies")
                }
                else if(index == 5){
                    premArr.push("Create Movies")
                }
                else if(index == 6){
                    premArr.push("Delete Movies")
                }
                else if(index == 7){
                    premArr.push("Update Movies")
                }
            }
            
        })
       
        let userObj = {firstName:firstname,lastName:lastname,SessionTimeOut:timeout}
        let premObj = {premissions:premArr,role:username}
        let loginObj = {username:username,password:password,userId:userId,role:username}
    
        
        axios.put(`http://localhost:8001/users/${userId}`,userObj)
        axios.put(`http://localhost:8001/logins/${loginId}`,loginObj)
        
        if(role == "user" ){
        axios.post(`http://localhost:8001/premissions`,premObj)
    
        }
        else{
        axios.put(`http://localhost:8001/premissions/${premId}`,premObj)
        }


         props.history.push('/main/users')
                     }

        const setCheckboxValue = (num) =>{
            
            premcheck[num] = !premcheck[num]

            if((num == 1 && premcheck[1] == true) || (num == 2 && premcheck[2] == true )||( num == 3 && premcheck[3] == true)){
                premcheck[0] = true
                document.getElementById("View Subscriptions").checked = true
         
            }
            else if((num == 5 && premcheck[5] == true) || (num == 6  && premcheck[6] == true)||( num == 7 && premcheck[7] == true)){
                premcheck[4] = true
                document.getElementById("View Movies").checked = true
            }
        }

        const click = () =>{
            if((premcheck[1] == true) || (premcheck[2] == true )||(premcheck[3] == true)){
                
            document.getElementById("View Subscriptions").checked = true
            }  
            if((premcheck[5] == true) || (premcheck[6] == true )||(premcheck[7] == true)){
                
                document.getElementById("View Movies").checked = true
                }
        }

        const cancel = () =>{

            props.history.push('/main/users')

        }
    return (
        <div  className="text-xl">
            <h1> <b>Edit User : </b> {firstname + " " + lastname} </h1>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="First Name" id="firstname"  onChange={(e)=>setFirstname(e.target.value)} />          <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="Last Name" id="lastname" onChange={(e)=>setLastname(e.target.value)} />           <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="Username" id="username" onChange={(e)=>setUsername(e.target.value)} />            <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="Seasion Timeout" id="timeout"  onChange={(e)=>setTimeout(e .target.value)} />     <br></br>
        <b>Premissions: </b> <br></br>
        View Subscriptions : <input type="checkbox" id="View Subscriptions" onClick={click} onChange={() => setCheckboxValue("0")} />          <br></br>
        Create Subscriptions : <input type="checkbox" id="Create Subscriptions" onChange={() => setCheckboxValue("1")} />        <br></br>
        Delete Subscriptions : <input type="checkbox" id="Delete Subscriptions" onChange={() => setCheckboxValue("2")} />        <br></br>
        Update Subscriptions : <input type="checkbox" id="Update Subscriptions" onChange={() => setCheckboxValue("3")} />        <br></br>
        View Movies : <input type="checkbox" id="View Movies" onClick={click} onChange={() => setCheckboxValue("4")} />                 <br></br>
        Create Movies : <input type="checkbox" id="Create Movies" onChange={() => setCheckboxValue("5")} />               <br></br>
        Delete Movies : <input type="checkbox" id="Delete Movies" onChange={() => setCheckboxValue("6")} />               <br></br>
        Update Movies : <input type="checkbox" id="Update Movies" onChange={() => setCheckboxValue("7")} />               <br></br><br></br>

        <input type="button" className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 m-2 rounded cursor-pointer" value="Save" onClick={save} />
        <input type="button" className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 m-2 rounded cursor-pointer" value="Cancel" onClick={cancel} />

        </div>
    );
};

export default EditUser;