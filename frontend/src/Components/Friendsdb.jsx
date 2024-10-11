
import React, { useEffect, useState } from 'react'
import FriendCard from './FriendCard/FriendCard'
import AddFriend from './FriendCard/AddFriend'
import { BASE_URL } from '../App';

export default function Friendsdb({isModalOpen,setIsModelOpen}) {
  
  const [users, SetUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  
  /* Initial Data addition */
  useEffect(() =>{
    fetchUsers();
  },[])

  const fetchUsers = async () => {
    try {
      const response = await fetch(BASE_URL + "/friends");
      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.error);
      }
      SetUsers(data);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  /* Model popup */
  const closeModal = () => {
    setIsModelOpen(false);
    setCurrentContact({});
  }
  
  /* Edit Friend */
  const[ currentContact, setCurrentContact ] = useState({}); // current editing contact

  const openEditModal = (user) => {
    if (isModalOpen) return
    setCurrentContact(user)
    setIsModelOpen(true)
  }

 


  return (
    <div className='friendsContainer'>
      {users.map((user) =>(
        <FriendCard key={user.id} user={user} updateContact={openEditModal} updateCallback={fetchUsers}/>
      ))}
        {isModalOpen && <AddFriend closeModal={closeModal} editUser={currentContact} updateCallback={fetchUsers}/>}
        
    </div>
  )
}