import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../../services/api';

export default function Hairdressers(){
  const [hairdressers, setHairdressers] = useState([]);

  useEffect(() => {
    async function loadHairdressers(){
    try {
      
      const response = await api.get(`/hairdressers`);
      setHairdressers(response.data);

    } catch (error) {
      alert(`Couldn't Load Hairdressers. Please try again. Error: ${error}.`);
    }
  }
  loadHairdressers();
  }, [])

  const history = useHistory();

  return (
    <div className="menu-container">

      <div className="menu-content">
        <h1>Hairdressers</h1>  

        <ul>
          {hairdressers.map(item => (
            <li key={item.id}>
              <p>{item.first_name + " " + item.last_name}</p>

              <p>{item.address}</p>

              <p>{item.average_stars}</p>

              <p>{item.style_expertise}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}