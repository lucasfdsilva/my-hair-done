import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function AdminCreateUser(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const history = useHistory();

  async function handleRegister(event){
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
      isAdmin
    }

    try {
      const response = await api.post('users', data);

      alert(`User Registered Successfully. User ID: ${response.data.newUserID[0]}`);

      history.push('/admin/users')

    } catch (error) {
        alert(`Couldn't Register User. Error: ${error}.`);
    }
  }

  return (
    <div className="admin-create-user-container">

      <div className="admin-create-user-content">
        <h1>Create User</h1>

        <Link to='/admin/users'>
          <FiArrowLeft size={16} color="#0c71c3"/>
          All Users 
        </Link> 

        <form onSubmit={handleRegister}>
          <p>First Name:</p>
          <input 
            required
            placeholder="First Name"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
          />

          <p>Last Name:</p>
          <input 
            required
            placeholder="Last Name"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
          />

          <p>Email:</p>
          <input 
            required
            type="email" 
            placeholder="you@email.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <p>Password:</p>
          <input 
            required
            type="password" 
            placeholder="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <p>Confirm Password:</p>
          <input 
            required
            type="password" 
            placeholder="confirm password"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          />

          <p>Is Admin?</p>
          <label className="custom-checkbox-container">
            <input
              checked
              className="is-admin" 
              type="checkbox" 
              value={isAdmin}
              onChange={event => setIsAdmin(event.target.checked)}
            />
            <span class="checkmark"></span>
          </label>

          <button type="submit" 
            disabled={!firstName || !lastName || !email || !password || !passwordConfirmation }>
            Create User
          </button>

        </form>
      </div>
    
    </div>
  )
}