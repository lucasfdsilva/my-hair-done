import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiMenu, FiBookOpen, FiClock, FiHome } from 'react-icons/fi';

import './styles.css';

export default function AdminNavigationMenu() {
  return (
    <div className="admin-navigation-menu-container">

      <div className="admin-navigation-menu-content">

        <div className="strong-link">
          <Link to='/admin'>
            <FiHome size={18} color="#FFF"/>
            Home
          </Link>
        </div>

        <div className="weak-link">
          <Link to='/admin/users'>
            <FiUsers size={18} color="#FFF"/>
            Users
          </Link>
        </div>

        <div className="strong-link">
          <Link to='/admin/slots'>
            <FiClock size={18} color="#FFF"/>
            Slots
          </Link>
        </div>

        <div className="weak-link">
          <Link to='/admin/menu'>
            <FiMenu size={18} color="#FFF"/>
            Menu
          </Link>
        </div>

        <div className="strong-link">
          <Link to='/admin/bookings'>
            <FiBookOpen size={18} color="#FFF"/>
            Bookings
          </Link>
        </div>

      </div>

    </div>
  )
}

