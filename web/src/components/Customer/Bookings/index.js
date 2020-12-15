import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2, FiBook } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api'

export default function Bookings(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const [bookings, setBookings] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function loadBookings(){
    try {
      
      if(!id || !accessToken) return history.push('/login');
      
      const response = await api.get(`/bookings?userID=${id}`);
      setBookings(response.data);

    } catch (error) {
      alert(`Couldn't Load Bookings. Please try again. Error: ${error}.`);
    }
  }
  loadBookings();
  }, [])

  async function handleBookingDeletion(event, bookingID){
    event.preventDefault();

    const response = await api.delete('bookings', { data: { id: bookingID }});

    alert('Booking Deleted Succesfully');

    window.location.reload();
  }

  return (
    <div className="bookings-container">

      <div className="bookings-content">
        <h1>Your Bookings</h1>

        {bookings.length == 0 ? (
          <h3>You have no bookings at the moment. 
            <Link to="/bookings/new">
                Book a table with us now
                <FiBook size={16} color="#e02041"/>
            </Link>
          </h3>
        ) : (
          <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              <strong>Booking ID:</strong>
              <p>{booking.id}</p>

              <strong>Slot ID:</strong>
              <p>{booking.slot_id}</p>

              <strong>Date:</strong>
              <p>{booking.date}</p>

              <strong>Start Time:</strong>
              <p>{booking.start_time}</p>

              <strong>Duration:</strong>
              <p>{booking.duration} minutes</p>

              <strong>People:</strong>
              <p>{booking.number_of_people} people</p>

              <button onClick={(event) => handleBookingDeletion(event, booking.id)}>
                <FiTrash2 size={20} color="#a8a8b3"/>
              </button>
            </li>
          ))}
        </ul>
        )}

      </div>

    </div>
  )
}