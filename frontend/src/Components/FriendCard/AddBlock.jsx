
import React from 'react'
import editIcon from '../../assets/edit.png'
import deleteIcon from '../../assets/delete.png'
import questionPic from '../../assets/question.jpeg'
import addIcon from '../../assets/add.png'

export default function FriendCard({openCreatModal}) {
    
    
  return (
    <div className='FrdCardBlock' onClick={openCreatModal}>
        <div className='CardTop'>

            <div className="CardTopContainer TopLeft">
                <img className="FrdPic"  src={questionPic} alt='pic'/>
                
                <p>
                    <span>Name</span>
                    <br/>Role
                </p>
            </div>
            <div className="CardTopContainer">
                <button
                    
                >
                    <img className="EditIcon" src={editIcon} />
                </button>
                <button
                ><img className="EditIcon" src={deleteIcon} /></button>
            </div>
        </div>
        <div className='CardBtm'>
            <p>Description ....</p>
        </div>
        <div className='AddBlock'><div class="plus">+</div></div>
    </div>
  )
}