import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import './styles.css';

import api from '../../../services/api';

export default function AdminViewUsers(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('users')
      .then(response => {
        var formattedUsers = [];
        for(const user of response.data){
          if(user.is_admin == 0){
            formattedUsers.push({ "id": user.id, "first_name": user.first_name, "last_name": user.last_name, "email": user.email, "is_admin": "No"})
          } else{
            formattedUsers.push({ "id": user.id, "first_name": user.first_name, "last_name": user.last_name, "email": user.email, "is_admin": "Yes"})
          }
        }
        setUsers(formattedUsers);
        })
  }, [])

  return (
    <div className="admin-view-users-container">

      <div className="admin-view-users-content">
      <h1>Registered Users</h1>

      <Link to='/admin/users/new'>
        <FiEdit size={16} color="#0c71c3"/>
        Create User  
      </Link> 

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p><strong className="id">User ID:</strong> {user.id}</p>
            <p><strong className="first-name">First Name:</strong> {user.first_name}</p>
            <p><strong className="last-name">Last Name:</strong> {user.last_name}</p>
            <p><strong className="email">Email:</strong> {user.email}</p>
            <p><strong className="admin">Is Admin:</strong> {user.is_admin}</p>
          </li>
        ))}
      </ul>

      </div>
    
    </div>

    
  )
}