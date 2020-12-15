import React from 'react'

import './styles.css'

import pubCounter from '../../../assets/pub-counter-cropped-blur.jpg'

export default function HomePageBody() {
  return (
    <div className="home-page-body">

      <img src={pubCounter}/>

      <h1>Asystec RESTaurant</h1>

      <h2>Book Online</h2>
      
    </div>
  )
}
