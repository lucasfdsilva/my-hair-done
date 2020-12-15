import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function EditProfile(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function loadProfile(){
    try {
      
      if(!id || !accessToken) return history.push('/login');
      
      const response = await api.get(`/users/${id}`);

      setFirstName(response.data.user.first_name);
      setLastName(response.data.user.last_name);
      setEmail(response.data.user.email);

    } catch (error) {
      alert(`Couldn't Load User Profile. Please try again. Error: ${error}.`);
    }
  }
  loadProfile();
  }, [])

  async function handleUpdateProfile(event){
    event.preventDefault();

    try {
      const data = {
        id,
        firstName,
        lastName,
        email,
        isAdmin: false
      }
      
      const response = await api.put(`users`, data);

      alert('User Profile Updated Successfully');

      history.push('/profile');

    } catch (error) {
      alert(`Couldn't Update User Profile. Please try again. Error: ${error}.`);
    }
  }

  return (
    <div className="edit-profile-container">

      <div className="edit-profile-content">
        <form onSubmit={handleUpdateProfile}>
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
            disabled
            onChange={event => setEmail(event.target.value)}
          />

          <Link to="/profile">
            <FiArrowLeft size={16} color="#e02041"/>
            Back to Profile
          </Link>

          <button type="submit">Save Profile</button>
        </form>
      </div>
     
    </div>
  )
}