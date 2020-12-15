import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function AdminViewBookings(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadProfile(){
    try {
      
      const response = await api.get(`/bookings`);
      setBookings(response.data);

    } catch (error) {
      alert(`Couldn't Load Bookings. Please try again. Error: ${error}.`);
    }
  }
  loadProfile();
  }, [])

  async function handleBookingDeletion(event, bookingID){
    event.preventDefault();

    api.delete('bookings', { data: { id: bookingID }});

    alert('Booking Deleted Successfully');

    window.location.reload();
  }

  return (
    <div className="admin-view-bookings-container">

        <div className="admin-view-bookings-content">
          <h1>All Bookings</h1>

          <Link to='/admin/bookings/new'>
            <FiEdit size={16} color="#0c71c3"/>
            Create Booking  
          </Link> 

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
                <p>{booking.duration}</p>

                <strong>People:</strong>
                <p>{booking.number_of_people}</p>

                <button onClick={(event) => handleBookingDeletion(event, booking.id)}>
                  <FiTrash2 size={20} color="#a8a8b3"/>
                </button>
              </li>
            ))}
          </ul>
        </div>

    </div>
  )
}