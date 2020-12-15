import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiMenu, FiBookOpen, FiClock, FiHome } from 'react-icons/fi';

import './styles.css';

export default function AdminHome(){

  return (
    <div className="admin-home-main-container">
      <div className="admin-home-main-content">
        <h1>Welcome to the Admin Panel</h1>

        <div className="links">
        <FiUsers className="users-icon" size={75} color="#0c71c3"/>
        <Link className="users-text" to='/admin/users'>Users</Link>

        <FiClock className="slots-icon" size={75} color="#0c71c3"/>
        <Link className="slots-text" to='/admin/slots'>Slots</Link>

        <FiMenu className="menu-icon" size={75} color="#0c71c3"/>
        <Link className="menu-text" to='/admin/menu'>Menu</Link>

        <FiBookOpen className="bookings-icon" size={75} color="#0c71c3"/>
        <Link className="bookings-text" to='/admin/bookings'>Bookings</Link>
        </div>

      </div>
    </div>
    
  )
}