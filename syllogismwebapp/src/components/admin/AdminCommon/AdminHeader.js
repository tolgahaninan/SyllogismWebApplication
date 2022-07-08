import React from 'react'
import '../../../css/admin/adminHeader.css'
import profilePhoto from "../../../assets/profilePhoto.jpeg"

function AdminHeader() {
  return (
    <div class="adminHeaderWrapper">
      <span class="adminPanelLogo"> Syllogism</span>
      <div class="adminProfileInfo">
        <img src={profilePhoto} class="adminProfilePhoto"></img>
        <span class="adminUsername">Ecem Tozal</span>
      </div>

    </div>
  )
}

export default AdminHeader