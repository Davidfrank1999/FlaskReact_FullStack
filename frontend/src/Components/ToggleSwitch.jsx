import React from 'react'
import sun from '../assets/sun.png'
import moon from '../assets/full-moon.png'

export default function ToggleSwitch() {
  return (
    <div className="toggle-switch">
        <img src={sun} className='toggleImg'/>
        <img src={moon} className='toggleImg'/>
    </div> 
  )
}