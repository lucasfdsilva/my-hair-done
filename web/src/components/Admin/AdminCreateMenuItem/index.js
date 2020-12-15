import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function AdminCreateMenuItem(){
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);

  const history = useHistory();

  async function handleMenuItemCreation(event){
    event.preventDefault();

    const data = {
      name,
      price,
      description,
      stock
    }

    try {
      const response = await api.post('menu', data);
      alert(`Menu Item created succesfully`);
      history.push('/admin')
      
    } catch (error) {
        alert(`Couldn't create menu item`);
    }
  }

  return (
    <div className="admin-create-menu-container">
      <div className="admin-create-menu-content">
        <h1>Create Menu Item</h1>

        <Link to='/admin/menu'>
          <FiArrowLeft size={16} color="#0c71c3"/>
          All Menu Items 
        </Link> 

        <form onSubmit={handleMenuItemCreation}>
          <strong>Name:</strong>
          <input 
            required
            type="text"
            placeholder="Menu Item Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <strong>Price:</strong>
          <input 
            required
            type="number"
            placeholder="Item Price"
            value={price}
            onChange={event => setPrice(event.target.value)}
          />
          <strong>Description:</strong>
          <input 
            required
            type="text" 
            placeholder="Item Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <strong>Stock:</strong>
          <input 
            required
            type="number"
            placeholder="Item Stock Level"
            value={stock}
            onChange={event => setStock(event.target.value)}
          />

          <button className="button" type="submit">Create Menu Item</button>

        </form>
      </div>
    </div>
  )
}