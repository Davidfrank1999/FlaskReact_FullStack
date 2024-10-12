
import React from 'react'
import editIcon from '../../assets/edit.png'
import deleteIcon from '../../assets/delete.png'
import { BASE_URL } from '../../App';

export default function FriendCard({user,updateContact, updateCallback}) {
    
    /* Delete Friend */
    const handleDelete = async (id) => {
        try {
        const res = await fetch(BASE_URL + `/friends/${id}`, {
            method: "DELETE",
        });
        if (res.status === 200) {
            updateCallback();// reload
            alert("Deletion success");
        } else {
            alert("Failed to Delete");
            console.error("Error:", error.message);
        }
        } catch (error) {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
        }
    }
    
  return (
    <div className='FrdCard'>
        <div className='CardTop'>

            <div className="CardTopContainer TopLeft">
                <img className="FrdPic" src={user.imgUrl} alt='pic'/>
                
                <p>
                    <span>{user.name}</span>
                    <br/>{user.role}
                </p>
            </div>
            <div className="CardTopContainer">
                <button
                    onClick={()=> updateContact(user)}
                >
                    <img className="EditIcon" src={editIcon} />
                </button>
                <button
                    onClick={() => handleDelete(user.id)}
                ><img className="EditIcon" src={deleteIcon} /></button>
            </div>
        </div>
        <div className='CardBtm'>
            {user.description}
        </div>
    </div>
  )
}