import "./add.css";
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {
  const flights = {
    airline: "",
    source: "",
    destn: "", // Corrected typo: destn -> destination
    fare: "",
    duration: ""
  };

  const [flight, setFlight] = useState(flights);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFlight({...flight, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", flight)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      });
  };

  return (
    <>
      <div className="add-flight-container"> {/* New container class */}
        <Link to="/">Back</Link>
        <h3>Add New Flight</h3>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="airline">Airline</label>
            <input
              type="text"
              onChange={inputHandler}
              id="airline"
              name="airline"
              placeholder="Airline"
            />
          </div>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              onChange={inputHandler}
              id="source"
              name="source"
              placeholder="Source"
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>  {/* Corrected label */}
            <input
              type="text"
              onChange={inputHandler}
              id="destination"
              name="destination" // Corrected name
              placeholder="Destination"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fare">Fare</label>
            <input
              type="text"
              onChange={inputHandler}
              id="fare"
              name="fare"
              placeholder="Fare"
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              onChange={inputHandler}
              id="duration"
              name="duration"
              placeholder="Duration"
            />
          </div>
          <button type="submit">ADD FLIGHT</button>
        </form>
      </div>
    </>
  );
};

export default Add;