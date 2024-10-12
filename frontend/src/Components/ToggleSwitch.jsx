import React, { useEffect, useState } from 'react'

export default function ToggleSwitch() {

    // Toggle Dark Mode settings
  const [isDarkMode, setIsDatkMode] = useState(false);
  const handleDarkMode = () => {
    setIsDatkMode(!isDarkMode);
  };

  useEffect (()=> {
    if (isDarkMode == true){
      setDarkMode();
    }else{
      setLightMode();
    }

  }, [isDarkMode])

  
    const setDarkMode = () => {
      document.querySelector("body").setAttribute('data-theme', 'dark')
    };
    const setLightMode = () => {
      document.querySelector("body").setAttribute('data-theme', 'light')
    };
  

  return (
    /* From Uiverse.io by juanpabl0svn */ 
  <label for="switch" class="switch">
    <input id="switch" type="checkbox" onChange={handleDarkMode} checked={isDarkMode} />
    <span class="slider"></span>
    <span class="decoration"></span>
  </label>

  )
}