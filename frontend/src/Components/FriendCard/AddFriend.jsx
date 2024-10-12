import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../App";

export default function AddFriend({closeModal, editUser, updateCallback}) {

  const [name, setName] = useState(editUser.name || "");
  const [role, setRole] = useState(editUser.role || "");
  const [description, setDescription] = useState(editUser.description || "");
  const [gender, setGender] = useState(editUser.gender || "");


  /* Editing friend */
  const updating = Object.entries(editUser).length !==0;
  
  /* Clearing Input boxs */
  const clearBox = ()=>{
    setName("");
    setRole("");
    setDescription("");
    setGender("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Adding the newfriend
    addFriend();
    // clearing the inputs
    clearBox();
    // closing modal
    closeModal();
    
  };

  /* Connecting with BackEnd For Add/Update */
  const addFriend = async () => {
    const FriendData = {
      name,
      role,
      description,
      gender,
    }
    try {
      const res = await fetch(BASE_URL + (updating ? `/friends/${editUser.id}`:"/friends"), {
        method: updating ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FriendData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      } else {
        alert(updating ? "Friend updated successfully" : "Friend added successfully");
        updateCallback();
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };


  const handleCancel =(e)=> {
    e.preventDefault();
    clearBox();
    closeModal();
  }

  
  return (
    <div className="AddFrdOverlay">
      <form className="AddFrdBox" >
        <h3>{updating ? "Edit Friend" : "Add New Friend"}</h3>
        <div className="NameRole">
          <div>
            <p>Full name</p>
            <input
              className="tirtiryColorTrans input"
              placeholder="Type name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p>Role</p>
            <input
              className="tirtiryColorTrans input"
              placeholder="Job Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
        <div>
          <p>Description</p>
          <input
            className="tirtiryColorTrans input"
            placeholder="About the Friend"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="genderInput">
          <label className="custom_radio" htmlFor="male">
            <input 
                id="male"
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")} 
            />
            <span className="radio-mark"></span>
            Male
          </label>

          <label className="custom_radio" htmlFor="female">
            <input 
                id="female"
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")} 
            />
            <span className="radio-mark"></span>
            Female
          </label>
        </div>
        <div className="AddFrdBtnContainer">
          <button 
            className="tirtiryColor"
            onClick={handleSubmit}
          >{updating ? "Update" : "Add"}</button>
          <button 
            className="tirtiryColor"
            onClick={handleCancel}
        >Cancel</button>
        </div>
      </form>
    </div>
  );
}
