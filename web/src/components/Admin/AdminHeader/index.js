import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import './styles.css';

import asystecLogo from '../../../assets/asystec-logo-white.png';

export default function AdminHeader(props) {

  const history = useHistory();

  return (
    <div className="header">

      <img src={asystecLogo} />
      
      <p>Logged as: {props.firstName + ' ' + props.lastName}</p>
        <Link onClick={() => {
          localStorage.setItem('id', '');
          localStorage.setItem('accessToken', '');
          localStorage.setItem('isAdmin', 0);
          return history.push('/admin/login');
        }}>
          <FiLogOut size={16} color="#FFF"/>
          Logout
        </Link>

    </div>
  )
}
