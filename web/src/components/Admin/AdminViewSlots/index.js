import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function AdminViewSlots(){
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    api.get('slots')
      .then(response => {
        var formattedSlots = [];
        for(const slot of response.data){
          var weekDays = [];
          if(slot.monday) weekDays.push('Monday, ');
          if(slot.tuesday) weekDays.push('Tuesday, ');
          if(slot.wednesday) weekDays.push('Wednesday, ');
          if(slot.thursday) weekDays.push('Thursday, ');
          if(slot.friday) weekDays.push('Friday, ');
          if(slot.saturday) weekDays.push('Saturday, ');
          if(slot.sunday) weekDays.push('Sunday');
          if(!slot.sunday && !slot.monday &&!slot.tuesday &&!slot.wednesday &&!slot.thursday &&!slot.friday &&!slot.saturday) weekDays.push('No Week Day Selected');

          formattedSlots.push({"id": slot.id, "start_time": slot.start_time, "duration": slot.duration, "max_capacity": slot.max_capacity, "week_days": weekDays});
        }

        setSlots(formattedSlots);
      })
  }, [])

  return (
    <div className="admin-view-slots-container">

      <div className="admin-view-slots-content">

        <h1>Registered Slots</h1>

        <Link to='/admin/slots/new'>
          <FiEdit size={16} color="#0c71c3"/>
          Create Slot  
        </Link>

        <ul>
          {slots.map(slot => (
            <li key={slot.id}>
              <p><strong className="id">Slot ID: </strong>{slot.id}</p>
              <p><strong className="start_time">Start Time: </strong>{slot.start_time}</p>
              <p><strong className="duration">Duration: </strong>{slot.duration} minutes</p>
              <p><strong className="max_capacity">Max Capacity: </strong>{slot.max_capacity} people</p>
              <p><strong className="week_days">Weekdays: </strong>{slot.week_days}</p>
            </li>
          ))}
        </ul>
      </div>
    
    </div>

    
  )
}