import React from 'react'

import './styles.css'

import githubIcon from '../../../assets/github-icon.png';

export default function Footer() {
  return (
    <div className="footer">

      <p>Developed by <a href="https://asystec.ie/" target="_blank">Asystec |</a></p>

      <a href="https://github.com/lucasfdsilva/RESTaurant" target="_blank">GitHub</a>

      <img src={githubIcon}/>
      
    </div>
  )
}
