import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function AdminViewMenuItems(){
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

  return (
    <div className="admin-view-menu-container">
      <div className="admin-view-menu-content">
        <h1>Menu Items</h1>  

        <Link to='/admin/menu/new'>
          <FiEdit size={16} color="#0c71c3"/>
          Create Menu Item  
        </Link> 

        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <strong>Menu Item ID:</strong>
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
