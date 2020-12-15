import React from 'react'

import './styles.css'

import githubIcon from '../../../assets/github-icon.png';

export default function Footer() {
  return (
    <div className="footer">

      <p>Developed by <a href="https://www.linkedin.com/in/lucas-fdsv/" target="_blank">Lucas DaSilva |</a></p>

      <a href="https://github.com/lucasfdsilva/my-hair-done" target="_blank">GitHub</a>

      <img src={githubIcon}/>
      
    </div>
  )
}
