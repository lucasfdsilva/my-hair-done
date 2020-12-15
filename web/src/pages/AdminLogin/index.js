import React from 'react'

import './styles.css'

import NavigationMenu from '../../components/Customer/NavigationMenu';
import Footer from '../../components/Customer/Footer';

import AdminLogin from '../../components/Admin/AdminLogin';

export default function Layout(props) {

  return (
    <div className="layout">
      <NavigationMenu/>

      <AdminLogin/>

      <Footer/>
    </div>
  )
}
