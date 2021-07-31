import React,{useState} from 'react';
import axios from 'axios';

const CreateUser = (props) => {

    

    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [username,setUsername] = useState("")
    const [timeout,setTimeout] = useState("")
    const [premcheck,setPremCheck] = useState([false,false,false,false,false,false,false,false])
  
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =  yyyy + '-' +  mm + '-' + dd;
    today.toString()

    let postCheck = false
        const save = async() =>{
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
        
        let userObj = {firstName:firstname,lastName:lastname,createdDate:today,SessionTimeOut:timeout}
        let premObj = {premissions:premArr,role:username}
        let loginObj = {username:username,role:username,userId:firstname}

    
        if(firstname == "" || lastname == "" || timeout == "" || username == ""  ){
            alert("fill in all the fields")
        }
        else{
            axios.post(`http://localhost:8001/users`,userObj)
            axios.post(`http://localhost:8001/premissions`,premObj)
            axios.post(`http://localhost:8001/logins`,loginObj)
            props.history.push('/main/users')
        }

        
       
        


         
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
        <div className="text-xl my-20">
        <br></br>

<div className="flex items-center bg-gray-800 text-white text-sm font-bold px-2 py-1 w-1/5 ml-auto mr-auto rounded" role="alert">
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
          <p>Fill in all of the fields.</p>
        <br></br>
          

          </div>
            <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="First Name" id="firstname" onChange={(e)=>setFirstname(e.target.value)} />          <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="Last Name" id="lastname" onChange={(e)=>setLastname(e.target.value)} />           <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="Username" id="username" onChange={(e)=>setUsername(e.target.value)} />            <br></br>
        <input type="text" className="my-1 shadow appearance-none border border-gray-800 rounded" placeholder="Seasion Timeout" id="timeout"  onChange={(e)=>setTimeout(e .target.value)} />     <br></br><br></br>
        <h2 className="font-bold text-2xl">Premissions</h2>
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

export default CreateUser;