import React, { useEffect, useState } from "react";
import axios from "axios";

const EditSubs = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [memberId, setmemberId] = useState("");

  useEffect(async () => {
    //json mount
    let jsonData = JSON.parse(sessionStorage.getItem("data"));

    let nameObj = (document.getElementById("name").value = jsonData.name);
    let emailObj = (document.getElementById("email").value = jsonData.email);
    let cityObj = (document.getElementById("city").value = jsonData.city);
    let memberIdObj = jsonData.memberId;
    console.log(memberIdObj);
    setName(nameObj);
    setEmail(emailObj);
    setCity(cityObj);
    setmemberId(memberIdObj);
  }, []);
  const save = () => {
    let memberObj = { name: name, email: email, city: city };

    axios.put(`http://localhost:8000/members/${memberId}`, memberObj);
    props.history.push("/main/showsubs");
  };
  const cancel = () => {
    props.history.push("/main/showsubs");
  };

  return (
    <div className="text-xl">
      <b>Edit Subscription:</b> <br></br>
      <input
        type="text"
        className="my-1 shadow appearance-none border border-gray-800 rounded"
        placeholder="Name"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br></br>
      <input
        type="text"
        className="my-1 shadow appearance-none border border-gray-800 rounded"
        placeholder="Email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br></br>
      <input
        type="text"
        className="my-1 shadow appearance-none border border-gray-800 rounded"
        placeholder="City "
        id="city"
        onChange={(e) => setCity(e.target.value)}
      />{" "}
      <br></br>
      <input
        type="button"
        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 m-2 rounded cursor-pointer"
        value="Save"
        onClick={save}
      />
      <input
        type="button"
        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 m-2 rounded cursor-pointer"
        value="Cancel"
        onClick={cancel}
      />
    </div>
  );
};

export default EditSubs;
