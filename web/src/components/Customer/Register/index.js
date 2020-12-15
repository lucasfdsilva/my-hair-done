import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function Register(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function checkIfUserIsLoggedIn(){
      try {
        if(id && accessToken) return history.push('/profile');

      } catch (error) {
        alert(`Couldn't Check if user is Logged in. Please try again. Error: ${error}.`);
      }
  }
  checkIfUserIsLoggedIn();
  }, [])

  async function handleRegister(event){
    event.preventDefault();

    if(password !== passwordConfirmation) return alert("Passwords don't match. Please try again.");

    const data = {
      firstName,
      lastName,
      email,
      password,
      isAdmin: false
    }

    try {
      const response = await api.post('users', data);

      alert(`User Registered Successfully. User ID: ${response.data.newUserID[0]}`);

      history.push('/login');

    } catch (error) {
        alert(`Couldn't Register User. Error: ${error}.`);
    }
  }

  return (
    <div className="register-container">

      <div className="register-content">
          <h1>Register</h1>

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

            <button 
              type="submit" 
              disabled={!firstName || !lastName || !email || !password || !passwordConfirmation }>
              Register
            </button>
          </form>

          <Link to="/login">
            <FiArrowLeft size={16} color="#e02041"/>
            Already have an account?
          </Link>

        </div>
      </div>
  )
}