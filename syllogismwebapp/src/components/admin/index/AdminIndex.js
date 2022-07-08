import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import AdminHeader from "../AdminCommon/AdminHeader";
import AdminSidebar from "../AdminCommon/AdminSidebar";
import AdminProduct from "../product/AdminProduct";
import AdminUser from "../user/AdminUser";
import { BrowserRouter } from "react-router-dom";

function AdminIndex() {
  return (

    <Fragment>
      <AdminHeader></AdminHeader>
      <div class="row">
      <AdminSidebar></AdminSidebar>
      
      </div>
    </Fragment>
  
  );
}

export default AdminIndex;
