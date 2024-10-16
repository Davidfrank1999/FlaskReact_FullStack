
import Navbar from './Components/Navbar'
import Friendsdb from './Components/Friendsdb'
import { useEffect, useState } from 'react'

export const BASE_URL ="http://127.0.0.1:5000/app"

function App() {
  
  const [isModalOpen, setIsModelOpen] = useState(false);
  const openCreatModal = ()=> {
    if (!isModalOpen) setIsModelOpen(true);
  }

  return (
    <>
        <Navbar openCreatModal={openCreatModal} />
        <Friendsdb isModalOpen={isModalOpen} setIsModelOpen={setIsModelOpen} openCreatModal={openCreatModal}/>
        
    </>
  )
}

export default App
