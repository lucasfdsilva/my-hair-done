import React from 'react'

import './styles.css';

import githubIcon from '../../../assets/github-icon-white.png';

export default function AdminFooter() {
  return (
    <div className="admin-footer">

      <p>Developed by <a href="https://asystec.ie/" target="_blank">Asystec |</a></p>

      <a href="https://github.com/lucasfdsilva/RESTaurant" target="_blank">GitHub</a>

      <img src={githubIcon}/>
      
    </div>
  )
}
