import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './flight.css'; // Assuming your CSS file is named flight.css


const Flight = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getall');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
        toast.error('Failed to fetch flights. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const deleteFlight = async (flightId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${flightId}`);
      setFlights((prevFlights) => prevFlights.filter((flight) => flight._id !== flightId));
      toast.success(response.data.msg, { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting flight:', error);
      toast.error('Failed to delete flight. Please try again later.');
    }
  };

  return (
    <div className="flightTable">
      <Link to="/add" className="addButton">
        Add Flight
      </Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Airline</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Fare</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={flight._id}>
              <td>{index + 1}</td>
              <td>{flight.airline}</td>
              <td>{flight.source}</td>
              <td>{flight.destn}</td>
              <td>{flight.fare}</td>
              <td>{flight.duration}</td>
              <td className="actionButtons">
                <button onClick={() => deleteFlight(flight._id)}>
                  delete
                </button>
                <Link to={`/edit/${flight._id}`}>
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Flight;