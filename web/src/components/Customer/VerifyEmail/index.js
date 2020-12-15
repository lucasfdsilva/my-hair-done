import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './styles.css';

import api from '../../../services/api';

export default function VerifyEmail(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const { token } = useParams();
  const [verificationToken, setVerificationToken] = useState(token);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function verifyEmailAddressHandler(){
      try {

        const response = await api.put(`/users/verify/${verificationToken}`);

        console.log(response)

        setMessage(response.data.message);

      } catch (error) {
        alert(`Couldn't Verify User Email Address. Please try again. Error: ${error}.`);
        console.log(error)
      }
  }
  verifyEmailAddressHandler();
  }, [])

  return (
    <div className="verify-email-container">

      <div className="verify-email-content">
        <h1>Thank you! Your email address has been verified.</h1>
      </div>
     
    </div>
  )
}