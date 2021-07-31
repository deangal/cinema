import React,{useState} from 'react';


const CreateLogin = (props) => {

   
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [bool,setbool] = useState(false)
    

const sendData = async() => {
    sessionStorage.setItem("username",username)
    sessionStorage.setItem("password",password)

    

     props.history.push('/')
}

const showPass = () =>{
    let elemnt = document.getElementById("passcreate")
    let button = document.getElementById("show")

    elemnt.type = "text"
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
        <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center    ">
        <div className=" mx-auto text-center ">
         
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
            <div className="h-10 bg-red-400 rounded-t-md text-center"> <span className="text-xl mr-2 font-bold">Create new user:</span></div>
            <div className="py-4 px-8">
              <label className="block font-semibold">Username</label>
              <input type="text" placeholder="Enter a username" onChange={(e)=>setUsername(e.target.value)} className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-red-600 rounded-md"/>
              <label className="block mt-3 font-semibold">Password</label>
              <input type="password" placeholder="Enter a password" onChange={(e)=>setPassword(e.target.value)} className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-red-600 rounded-md"/>
              <div className="flex justify-between items-baseline">
                <button className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-600"  onClick={sendData}>Create</button>
            
             
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};




export default CreateLogin;


