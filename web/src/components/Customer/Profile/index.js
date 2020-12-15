import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function Profile(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(0);
  const [memberSince, setMemberSince] = useState('')

  const history = useHistory();

  useEffect(() => {
    async function loadProfile(){
    try {
      
      if(!id || !accessToken) return history.push('/login');
      
      const response = await api.get(`/users/${id}`);

      setFirstName(response.data.user.first_name);
      setLastName(response.data.user.last_name);
      setEmail(response.data.user.email);
      setVerified(response.data.user.verified);
      setMemberSince(response.data.user.created_at);

    } catch (error) {
      alert(`Couldn't Load User Profile. Please try again. Error: ${error}.`);
    }
  }
  loadProfile();
  }, [])

  async function handleVerificationEmail(event){
    event.preventDefault();

    try{

      const data = {
        firstName,
        email
      }

      const response = await api.post('/users/verify/send', data)

      alert('Verification Email Successfully');

    } catch(error){
      alert(`Couldn't send verification email. Error: ${error}`)
    }
  }

  async function handleDeleteUser(){
    try {

      const response = await api.delete('users', { data: { id: id }});

      localStorage.setItem('id', '');
      localStorage.setItem('accessToken', '');

      alert(`User Deleted Succesfully ${response.data}`);

      history.push('/');
      
    } catch (error) {
      alert(`Could not delete user. Error: ${error}`)
    }

  }

  return (
    <div className="profile-container">

      <div className="profile-content">
        <h1>Profile</h1>
        
        <form>
          <strong>First Name:</strong>
          <p>{firstName}</p>

          <strong>Last Name:</strong>
          <p>{lastName}</p>

          <strong>Email:</strong>
          <p>{email}</p>

          <strong>Verified:</strong>
          {verified ? (
            <p>Yes</p>
          ) : (
            <>
              <p>No <button className="verification-button" onClick={handleVerificationEmail}>Send Verification Email</button></p>
            </>
          )}

          <strong>Member Since:</strong>
          <p>{memberSince}</p>
        </form>

        <Link to="/profile/edit">
          <FiEdit2 size={16} color="#e02041"/>
          Edit Profile
        </Link>

        <Link onClick={handleDeleteUser}>
          <FiTrash2 size={16} color="#e02041"/>
          Delete Account
        </Link>

      </div>
    </div>
  )
}