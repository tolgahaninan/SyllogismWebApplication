import React from "react";
import "../../../css/admin/adminSidebar.css";
import profilePhoto from "../../../assets/profilePhoto.jpeg";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
function AdminSidebar() {
  return (
    <div class="adminSidebarWrapper">
      <div class="adminSidebarProfileInfo">
        <img src={profilePhoto} class="adminSidebarProfilePhoto"></img>
        <div class="adminSidebarProfileInfoRightWrapper">
          <span class="adminSidebarUsername">Ecem Tozal</span>
          <div class="adminSidebarStatus">
            <span class="adminSidebarStatusShape"></span>
            <div class="adminSidebarStatusText">Online</div>
          </div>
        </div>
      </div>
      <div class="adminSidebarOptionsWrapper">
        <ul class="adminSidebarOptionList">
        <Link to="/admin/siteinfo">
            <li class="adminSidebarOptionListSingleOption">
              <i class="fa fa-gear" aria-hidden="true"></i>
              Site Info
            </li>
          </Link>
          <Link to="/admin/users">
            <li class="adminSidebarOptionListSingleOption">
              <i class="fa fa-user" aria-hidden="true"></i>
              User Operations
            </li>
          </Link>
          <Link to="/admin/product">
            <li class="adminSidebarOptionListSingleOption">
              <i class="fa fa-shopping-cart"> </i>
              Product Operations{" "}
            </li>
          </Link>
          <Link to="/admin/categories">
            <li class="adminSidebarOptionListSingleOption">
              <i class="fa fa-list-alt"> </i>
              Category Operations{" "}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
