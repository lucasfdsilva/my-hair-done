import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import AWS from 'aws-sdk';
import bcrypt from 'bcryptjs';

import './styles.css';

import api from '../../../services/api';

export default function NewBooking() {
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

  const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

  const history = useHistory();

  useEffect(() => {
    async function getCredentials(){
      try{
        const response = await api.get('/authenticate');

        const AKI = atob(response.data.AKI);
        const SAK = atob(response.data.SAK);

        console.log(AKI, SAK)

        AWS.config.update({region: 'eu-west-1',
                          accessKeyId: AKI,
                          secretAccessKey: SAK});
      }catch (error) {
        alert(`Couldn't Authenticate with Backend. Please try again. Error: ${error}.`);
      }
    }

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
  getCredentials();
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

      const SQSParams = {
        MessageAttributes: {
          userID: {
            DataType: "String",
            StringValue: String(data.userID),
          },
          userEmail: {
            DataType: "String",
            StringValue: String(data.userEmail),
          },
          date: {
            DataType: "String",
            StringValue: String(data.date),
          },
          slotID: {
            DataType: "String",
            StringValue: String(data.slotID),
          },
          numberOfPeople: {
            DataType: "String",
            StringValue: String(data.numberOfPeople),
          },
          startTime: {
            DataType: "String",
            StringValue: String(data.startTime),
          },
          duration: {
            DataType: "String",
            StringValue: String(data.duration),
          },
        },
        MessageBody: `{"userID":${data.userID},"userEmail":"${data.userEmail}","date":"${data.date}","slotID":${data.slotID},"numberOfPeople":${data.numberOfPeople},"startTime":"${data.startTime}","duration":${data.duration}}`,
        MessageDeduplicationId:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        MessageGroupId: "Group1", // Required for FIFO queues
        QueueUrl:
          "https://sqs.eu-west-1.amazonaws.com/128363080680/RESTaurant-NewBooking.fifo",
      };

      sqs.sendMessage(SQSParams, function(err, data){
        if (err) {
          console.log("Error", err);
          return alert("Error Creating Booking", err);
        } else {
          console.log("Success", data.MessageId);

          alert("Booking Registered Successfully. Confirmation Email will arrive shortly.");
          history.push('/bookings');
        }
      })

    } catch (error) {
      alert(`Couldn't Create Booking.`);
    }
  }

  return (
    <div className="new-booking-container">

      <div className="new-booking-content">
        <h1>New Booking</h1>

        <Link to="/bookings">
          <FiArrowLeft size={16} color="#e02041"/>
          Your Bookings
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
