import React, { useState } from "react";
import axios from "axios";

const CreateSubs = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const add = () => {
    let memberObj = { name: name, email: email, city: city };

    if (name == "" || email == "" || city == "") {
      alert("fill in all the fields");
    } else {
      axios.post(`http://localhost:8000/members`, memberObj);
      props.history.push("/main/showsubs");
    }
  };

  return (
    <div className="text-xl my-20 ">
      <br></br>
      <div
        className="flex items-center bg-gray-800 text-white text-sm font-bold px-2 py-1 w-1/5 ml-auto mr-auto rounded  "
        role="alert"
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>Fill in all of the fields.</p>
        <br></br>
      </div>
      <br></br>
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
      <br></br>
      <input
        type="button"
        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 m-6 rounded cursor-pointer"
        value="Create"
        onClick={add}
      />
    </div>
  );
};

export default CreateSubs;
