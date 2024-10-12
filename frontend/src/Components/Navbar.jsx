import React from 'react'
import addIcon from '../assets/add.png'
import ToggleSwitch from './ToggleSwitch'

export default function Navbar({openCreatModal}) {
  return (
    <nav>
        <div className='NavContainer'><span className='NavLeft'>Friends database</span></div>
        <div className='NavContainer NavRight'>
            <ToggleSwitch />
            <div onClick={openCreatModal}>
            <img src={addIcon} className='toggleImg AddIcon' />
            </div>
        </div>
    </nav>
  )
}