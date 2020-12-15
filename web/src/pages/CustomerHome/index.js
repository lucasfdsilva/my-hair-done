import React from 'react'

import './styles.css'

import NavigationMenu from '../../components/Customer/NavigationMenu';
import Footer from '../../components/Customer/Footer';
import Bookings from '../../components/Customer/Bookings';
import EditProfile from '../../components/Customer/EditProfile';
import Home from '../../components/Customer/Home';
import Login from '../../components/Customer/Login';
import Menu from '../../components/Customer/Menu';
import NewBooking from '../../components/Customer/NewBooking';
import Profile from '../../components/Customer/Profile';
import Register from '../../components/Customer/Register';
import VerifyEmail from '../../components/Customer/VerifyEmail';

export default function Layout(props) {
  const components = {
    NavigationMenu,
    Footer,
    Bookings,
    EditProfile,
    Home,
    Login,
    Menu,
    NewBooking,
    Profile,
    Register,
    VerifyEmail,
  }
  
  const ComponentToRender = components[props.component];

  return (
    <div className="layout">
      <NavigationMenu/>

      <ComponentToRender />

      <Footer/>
    </div>
  )
}
