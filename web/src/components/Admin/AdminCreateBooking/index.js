import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function AdminCreateBooking() {
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const [date, setDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotID, setSlotID] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(0);

  const history = useHistory();

  useEffect(() => {
    async function loadProfile(){
    try {
      
      if(!id || !accessToken) return history.push('/login');
      
      const response = await api.get(`/users/${id}`);

      setFirstName(response.data.user.first_name);
      setLastName(response.data.user.last_name);
      setEmail(response.data.user.email);

    } catch (error) {
      alert(`Couldn't Load User Profile. Please try again. Error: ${error}.`);
    }
  }
  loadProfile();
  }, [])

  async function handleCheckAvailability(event){
    event.preventDefault();

    try{
      const response = await api.get(`availability?date=${date}&numberOfPeople=${parseInt(numberOfPeople)}`);

      if(response.data.availableSlots.length == 0){
        alert('No Slots available on this date');
      }
      
      setAvailableSlots(response.data.availableSlots);
    } catch(error){
      alert(`Couldn't load available slots. Please try again. error: ${error}`)
    }
  }

  async function handleBookingCreation(event){
    event.preventDefault();

    try {
      const data = {
        userID: id,
        userEmail: email,
        date,
        slotID,
        numberOfPeople: parseInt(numberOfPeople),
        startTime,
        duration
      }

      const response = await api.post('bookings', data);

      alert('Booking Registered Successfully');

      history.push('/bookings');

    } catch (error) {
      alert(`Couldn't Create Booking.`);
    }
  }

  return (
    <div className="admin-create-booking-container">

      <div className="admin-create-booking-content">

        <h1>New Booking</h1>

        <Link to="/admin/bookings">
          <FiArrowLeft size={16} color="#0c71c3"/>
          All Bookings
        </Link>

        <form action="submit">
          <p>Date:</p>  
          <input 
            required
            type="date" 
            value={date}
            onChange={event => setDate(event.target.value)}
          />
          <p>Number of People:</p>
          <input 
            required
            type="number" 
            placeholder="Number of people"
            value={numberOfPeople}
            onChange={event => setNumberOfPeople(event.target.value)}
          />

          <button 
            className="secondary-button" 
            onClick={handleCheckAvailability}
            disabled={!date || numberOfPeople === 0}
          >
          Check Availability
          </button>

          {availableSlots.length > 0 ? (
            <p className="available-slots">Available Slots:</p>
          ) : (
            <></>
          )}
          <ul>
            {availableSlots.map(slot => (
              <button className="slot-button" key={slot.slot_id} value={slotID} onClick={ 
                function(event){ 
                  event.preventDefault();
                  setSlotID(slot.slot_id);
                  setStartTime(slot.start_time); 
                  setDuration(slot.duration);  
                } 
              }>
                <strong>{slot.start_time} - {slot.duration} mins {slot.available_capacity} capacity left</strong>
              </button>
            ))}
          </ul>
          
          <p className="available-slots">Confirmation Email:</p>
          <input 
            required
            type="email" 
            placeholder="Your email you@email.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
            disabled={slotID == 0}
          />

          <button className="primary-button" disabled={slotID == 0} onClick={handleBookingCreation}>Send Booking</button>
        </form>

      </div>
    </div>
  )
}
