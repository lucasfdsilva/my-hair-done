import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import './styles.css';

import api from '../../../services/api';

export default function AdminLogin(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function loadProfile(){
      try {
        if(id && accessToken && isAdmin == 1) return history.push('/admin');

      } catch (error) {
        alert(`Couldn't Load User Profile. Please try again. Error: ${error}.`);
      }
  }
  loadProfile();
  }, [])

  async function handleAdminLogin(event){
    event.preventDefault();

    const data = {
      email,
      password
    }

    try {
      const response = await api.post('sessions', data);
      if(!response.data.isAdmin) return alert('User is not an admin. Cannot access Admin Panel');

      localStorage.setItem('id', response.data.id);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('isAdmin', response.data.isAdmin);

      alert(`User Logged In Successfully.`);

      history.push('/admin');

    } catch (error) {
        alert(`Couldn't Log in. Error: ${error}.`);
    }
  }
  
  return (
    <div className="admin-login-container">

      <div className="admin-login-content">
        <h1>Admin Panel Login</h1>

        <form onSubmit={handleAdminLogin}>
          <p>Email: </p>
          <input 
            type="email" 
            placeholder="you@email.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <p>Password: </p>
          <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <button type="submit">Login</button>
          </form>
          
      </div>

    </div>
  )
}