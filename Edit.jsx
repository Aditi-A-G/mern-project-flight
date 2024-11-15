import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
 // Assuming your CSS file is named add.css

const Edit = () => {
  const [flight, setFlight] = useState({}); // Initialize empty flight object
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getone/${id}`);
        setFlight(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
        toast.error("Failed to fetch flight data. Please try again later.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update/${id}`, flight);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error updating flight:", error);
      toast.error("Failed to update flight. Please try again later.");
    }
  };

  return (
    <div className="addflight">
      <Link to="/">Back</Link>
      <h3>Update Flight</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="airline">Airline</label>
          <input
            type="text"
            value={flight.airline} // Access specific flight property
            onChange={handleChange}
            id="airline"
            name="airline"
            autoComplete="off"
            placeholder="Airline"
          />
        </div>
        <div className="inputGroup">
          {/* Assuming other properties exist in your backend response */}
          <label htmlFor="source">Source</label>
          <input
            type="text"
            value={flight.source} // Access specific flight property
            onChange={handleChange}
            id="source"
            name="source"
            autoComplete="off"
            placeholder="Source"
          />
        </div>
        {/* Add input groups for other flight properties as needed */}
        <div className="inputGroup">
          <button type="submit">UPDATE FLIGHT</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;