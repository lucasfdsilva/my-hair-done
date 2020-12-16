import React from 'react'

import './styles.css'

import hairSalon from '../../../assets/hair-salon.jpg'

export default function HomePageBody() {
  return (
    <div className="home-page-body">

      <img src={hairSalon}/>

      <h1>My Hair Done</h1>

      <h2>Style or Get Styled with Us</h2>
      
    </div>
  )
}
