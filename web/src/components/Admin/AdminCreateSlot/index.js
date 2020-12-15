import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function AdminCreateSlots(){
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const history = useHistory();

  async function handleSlotCreation(event){
    event.preventDefault();

    const data = {
      startTime,
      duration,
      maxCapacity,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    }

    try {
      const response = await api.post('slots', data);

      alert(`Slot created successfully`);

      history.push('/admin/slots')

    } catch (error) {
        alert(`Couldn't create slot. Error: ${error}`);
    }
  }

  return (
    <div className="admin-create-slot-container">
      <div className="admin-create-slot-content">
        <h1>Create Slot</h1>

        <Link to='/admin/slots'>
          <FiArrowLeft size={16} color="#0c71c3"/>
          All Slots 
        </Link> 

        <form onSubmit={handleSlotCreation}>

          <p>Start Time:</p>
          <input 
            required
            type="time"
            placeholder="Start Time e.g. 18:00"
            value={startTime}
            onChange={event => setStartTime(event.target.value)}
          />
          <p>Duration (in minutes):</p>
          <input 
            required
            type="number"
            placeholder="Duration in minutes"
            value={duration}
            onChange={event => setDuration(event.target.value)}
          />
          <p>Maximum capacity:</p>
          <input 
            required
            type="number" 
            placeholder="Maximum people capacity"
            value={maxCapacity}
            onChange={event => setMaxCapacity(event.target.value)}
          />

          <div className="weekdays">
            <strong>Week days</strong>
            <label className="custom-checkbox-container">
              <input 
                type="checkbox" 
                value={monday}
                onChange={event => setMonday(event.target.checked)}
              />
              <span class="checkmark"></span>
              Monday
            </label>

            <label className="custom-checkbox-container">
              <input 
                type="checkbox" 
                value={tuesday}
                onChange={event => setTuesday(event.target.checked)}
              />
              <span class="checkmark"></span>
              Tuesday
            </label>

            <label className="custom-checkbox-container">
              <input 
                type="checkbox" 
                value={wednesday}
                onChange={event => setWednesday(event.target.checked)}
              />
              <span class="checkmark"></span>
              Wednesday
            </label>

            <label className="custom-checkbox-container">
              <input 
                type="checkbox" 
                value={thursday}
                onChange={event => setThursday(event.target.checked)}
              />
              <span class="checkmark"></span>
              Thursday
            </label>

            <label className="custom-checkbox-container">
              <input 
                type="checkbox" 
                value={friday}
                onChange={event => setFriday(event.target.checked)}
              />
              <span class="checkmark"></span>
              Friday
            </label>

            <label className="custom-checkbox-container">
              <input 
                type="checkbox" 
                value={saturday}
                onChange={event => setSaturday(event.target.checked)}
              />
              <span class="checkmark"></span>
              Saturday
            </label>

            <label className="custom-checkbox-container">
              <input 
                type="checkbox" 
                value={sunday}
                onChange={event => setSunday(event.target.checked)}
              />
              <span class="checkmark"></span>
              Sunday
            </label>
          </div>

          <button className="button" type="submit">Create Slot</button>

        </form>
      </div>
    
    </div>
  )
}