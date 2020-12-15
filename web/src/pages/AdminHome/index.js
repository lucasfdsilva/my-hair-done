import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import AdminHeader from '../../components/Admin/AdminHeader';
import AdminNavigationMenu from '../../components/Admin/AdminNavigationMenu';
import AdminFooter from '../../components/Admin/AdminFooter';

import AdminHomeMain from '../../components/Admin/AdminHomeMain';
import AdminViewUsers from '../../components/Admin/AdminViewUsers';
import AdminCreateUser from '../../components/Admin/AdminCreateUser';
import AdminViewSlots from '../../components/Admin/AdminViewSlots';
import AdminCreateSlot from '../../components/Admin/AdminCreateSlot';
import AdminViewMenuItems from '../../components/Admin/AdminViewMenuItems';
import AdminCreateMenuItem from '../../components/Admin/AdminCreateMenuItem';
import AdminViewBookings from '../../components/Admin/AdminViewBookings';
import AdminCreateBooking from '../../components/Admin/AdminCreateBooking';

export default function AdminHome(props){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const history = useHistory();

  const components = {
    AdminHomeMain,
    AdminViewUsers,
    AdminCreateUser,
    AdminViewSlots,
    AdminCreateSlot,
    AdminViewMenuItems,
    AdminCreateMenuItem,
    AdminViewBookings,
    AdminCreateBooking,
  }
  
  const ComponentToRender = components[props.component];

  useEffect(() => {
    async function loadProfile(){
    try {
      if(!id || !accessToken || isAdmin == 0) return history.push('/admin/login');

      const response = await api.get(`/users/${id}`);

      setFirstName(response.data.user.first_name);
      setLastName(response.data.user.last_name);

      console.log(response.data.user.is_admin)

      if(!response.data.user.is_admin) return history.push('/admin/login');
      
    } catch (error) {
      alert(`Couldn't Load User Profile. Please try again. Error: ${error}.`);
    }
  }
  loadProfile();
  }, [])

  return (
    <div className="admin-home-container">

      <AdminHeader firstName={firstName} lastName={lastName}/>

      <AdminNavigationMenu />

      <ComponentToRender />

      <AdminFooter />

    </div>
  )
}