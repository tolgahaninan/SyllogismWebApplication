import React from "react";
import { Route, Switch, Routes } from "react-router-dom";
import axios from "axios";
import UseModal from "../helper/UseModal";
//User
import Index from "../index/Index";
import Login from "../common/Login";
import Header from "../common/Header";
import Navi from "../common/Navi";
import Products from "../product/Products";
import ProductDetail from "../product/ProductDetail";
//Error
import Error401 from "../error/Error401";
import Error403 from "../error/Error403";
import error404 from "../error/Error404";
//Admin
import AdminCategory from "../admin/category/AdminCategory";
import AdminIndex from "../admin/index/AdminIndex";
import AdminProduct from "../admin/product/AdminProduct";
import AdminUser from "../admin/user/AdminUser";
import AdminSiteInfo from "../admin/siteInfo/AdminSiteInfo";
//User
import UserFavourites from "../user/UserFavourites";
import UserProfile from "../user/UserProfile";
import ProductCompareModal from "../product/ProductCompareModal";
import UseCompareModal from "../helper/UseCompareModal";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-type"] = "application/json";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App()
 {
 
 
  return (
    <div>
     
      <Switch>
        <Route
          exact
          path="/"
          component={Index}
         
        />
        <Route exact path="/:category/products" component={Products} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/401" component={Error401} />
        <Route exact path="/403" component={Error403} />
        <Route exact path="/404" component={error404} />
        <Route exact path="/user/favourites" component={UserFavourites}></Route>
        <Route exact path="/user/profile" component={UserProfile}></Route>
        <Route exact path="/admin/users" component={AdminUser}></Route>
        <Route exact path="/admin/product" component={AdminProduct}></Route>
        <Route exact path="/admin/categories" component={AdminCategory}></Route>
        <Route exact path="/admin/siteinfo" component={AdminSiteInfo}></Route>
      </Switch>
    </div>
  );
}

export default App;
