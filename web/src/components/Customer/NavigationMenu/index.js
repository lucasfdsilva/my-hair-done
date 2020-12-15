import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiHome,  FiMenu, FiLogIn, FiEdit, FiUser, FiBookOpen, FiBook, FiLogOut } from 'react-icons/fi';

import './styles.css';

import asystecLogo from '../../../assets/asystec-logo.png';

export default function NavigationMenu(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  const history = useHistory();

  if(id && accessToken){
    return(
      <div className="navigation-menu">
        <div className="left-links">
          <Link to="/">
            <FiHome size={16} color="#e02041"/>
            Home
          </Link>
          <Link to="/menu">
            <FiMenu size={16} color="#e02041"/>
            Menu
          </Link>
          {isAdmin == 1 && 
            <Link className="admin-panel" to="/admin">
              <FiBook size={16} color="#FFF"/>
              Admin Panel
          </Link>
          }
        </div>
          
        <img src={asystecLogo} alt=""/>
  
        <div className="logged-right-links">
          <Link to="/profile">
            <FiUser size={16} color="#e02041"/>
            Profile
          </Link>
          <Link to="/bookings">
            <FiBookOpen size={16} color="#e02041"/>
            Bookings
          </Link>
          <Link className="book-online" to="/bookings/new">
            <FiBook size={16} color="#FFF"/>
            Book Online
          </Link>
          <Link onClick={() => {
            localStorage.setItem('id', '');
            localStorage.setItem('accessToken', '');
            localStorage.setItem('isAdmin', 0);
            window.location.reload();
          }}>
            <FiLogOut size={16} color="#e02041"/>
            Logout
          </Link>
        </div>
      </div>
    )
  }
  else{
    return(
      <div className="navigation-menu">
          <div className="left-links">
            <Link className="header-link" to="/">
              <FiHome size={16} color="#e02041"/>
              Home
            </Link>
  
            <Link className="header-link" to="/menu">
              <FiMenu size={16} color="#e02041"/>
              Menu
            </Link>
          </div>
  
          <img src={asystecLogo} alt=""/>
  
          <div className="right-links">
            <Link className="header-link" to="/register">
              <FiEdit size={16} color="#e02041"/>
              Register
            </Link>
            <Link className="header-link" to="/login">
              <FiLogIn size={16} color="#e02041"/>
              Login
            </Link>
            <Link className="book-online" to="/bookings/new">
              <FiBook size={16} color="#FFF"/>
              Book Online
            </Link>
          </div>
      </div>
    )
  }
}
