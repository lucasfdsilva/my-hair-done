import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../../services/api';

export default function Menu(){
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function loadMenuItems(){
    try {
      
      const response = await api.get(`/menu`);
      setMenuItems(response.data);

    } catch (error) {
      alert(`Couldn't Load Menu Items. Please try again. Error: ${error}.`);
    }
  }
  loadMenuItems();
  }, [])

  const history = useHistory();

  return (
    <div className="menu-container">

      <div className="menu-content">
        <h1>Menu Items</h1>  

        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <strong>Menu Item:</strong>
              <p>{item.id}</p>

              <strong>Name:</strong>
              <p>{item.name}</p>

              <strong>Price:</strong>
              <p>€{item.price}</p>

              <strong>Description:</strong>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}